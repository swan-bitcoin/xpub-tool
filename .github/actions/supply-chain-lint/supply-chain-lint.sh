#!/usr/bin/env bash

# Supply Chain Lint — scans vendored actions for runtime supply chain risks
#
# Detects: runtime package installs, unpinned versions, disabled lockfiles,
#          curl|bash, and other supply chain risks in action.yml and .sh files.
#
# Violations are checked against a supply-chain-allowlist.yml.
# Non-allowlisted violations cause exit 1.
#
# Environment variables (set by composite action, optional for direct use):
#   SCAN_ROOT          — directory to scan (defaults to parent of script dir)
#   ALLOWLIST_PATH     — path to allowlist YAML (defaults to $SCRIPT_DIR/supply-chain-allowlist.yml)
#   SCAN_LOCAL_ACTIONS — scan the repo's own .github/actions/ (default: true; "false" to skip)

set -eo pipefail

# ── Patterns (edit here to add/remove checks) ───────────────────────────────
#
# Each entry has 4 fields separated by "::":
#
#   category :: grep_pattern :: detail :: exclude_string
#
#   category       — grouping label for the violation
#   grep_pattern   — extended regex passed to grep -E
#   detail         — human-readable description (used for allowlist matching)
#   exclude_string — optional fixed string(s); lines containing this are skipped
#                    use comma to separate multiple excludes (applied independently)
#
# Lines matching echo/printf/description:/# comments are always skipped.

PATTERNS=(
  # ── Runtime install commands ──────────────────────────────────────────────
  "runtime-install :: npm install           :: npm install                         :: npm ci"
  "runtime-install :: npx                   :: npx                                :: "
  "runtime-install :: pip3? install         :: pip install without constraints     :: -c "
  "runtime-install :: yarn install          :: yarn install without lockfile pinning :: frozen-lockfile,--immutable"
  "runtime-install :: bun install           :: bun install without --frozen-lockfile  :: frozen-lockfile"
  "runtime-install :: curl .+\| *bash      :: curl|bash                           :: "
  "runtime-install :: curl .+\| *sh[^a-z]  :: curl|sh                             :: "
  "runtime-install :: apt-get install       :: apt-get install                     :: "
  "runtime-install :: apk add              :: apk add                             :: "

  # ── Unpinned versions ─────────────────────────────────────────────────────
  "unpinned-version :: @latest              :: @latest                             :: "
  "unpinned-version :: --no-package-lock    :: lockfile explicitly disabled        :: "
  "unpinned-version :: --no-lockfile        :: lockfile explicitly disabled        :: "
)

# ── Setup ────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="${SCAN_ROOT:-$(cd "$SCRIPT_DIR/.." && pwd)}"

# Allowlist files: built-in (ships with the action) + optional repo-specific
BUILTIN_ALLOWLIST="${BUILTIN_ALLOWLIST_PATH:-$SCRIPT_DIR/supply-chain-allowlist.yml}"
REPO_ALLOWLIST="${REPO_ALLOWLIST_PATH:-}"

RED='\033[0;31m'
GREEN='\033[0;32m'
BOLD='\033[1m'
NC='\033[0m'

error() { echo -e "${RED}$1${NC}"; }
info()  { echo -e "${GREEN}$1${NC}"; }
bold()  { echo -e "${BOLD}$1${NC}"; }

cd "$REPO_ROOT"

# Compute self-exclusion path: skip the lint script's own directory to avoid
# false positives from pattern definitions in this file
SELF_EXCLUDE=""
if [[ "$SCRIPT_DIR" == "$REPO_ROOT"/* ]]; then
  SELF_EXCLUDE="${SCRIPT_DIR#$REPO_ROOT/}"
fi

VIOLATIONS_FILE=$(mktemp)
trap "rm -f $VIOLATIONS_FILE" EXIT

# ── Pre-parse allowlist ──────────────────────────────────────────────────────

# Build a flat list of "file|pattern" pairs from allowlist YAML files
ALLOWLIST_ENTRIES=""

parse_allowlist() {
  local file="$1"
  [[ ! -f "$file" ]] && return
  local current_file=""
  while IFS= read -r line || [[ -n "$line" ]]; do
    [[ "$line" =~ ^[[:space:]]*# ]] && continue
    [[ "$line" =~ ^[[:space:]]*$ ]] && continue
    if [[ "$line" =~ ^[[:space:]]*-[[:space:]]*file: ]]; then
      current_file=$(echo "$line" | sed -E 's/^[[:space:]]*-[[:space:]]*file:[[:space:]]*//' | tr -d '"' | tr -d "'")
    elif [[ "$line" =~ ^[[:space:]]+pattern: ]]; then
      local current_pattern
      current_pattern=$(echo "$line" | sed -E 's/^[[:space:]]*pattern:[[:space:]]*//' | tr -d '"' | tr -d "'")
      ALLOWLIST_ENTRIES="${ALLOWLIST_ENTRIES}${current_file}|${current_pattern}"$'\n'
    fi
  done < "$file"
}

parse_allowlist "$BUILTIN_ALLOWLIST"
parse_allowlist "$REPO_ALLOWLIST"

# Allowlist match: the allowlist `pattern` must appear as a substring of the
# actual matched line. This lets entries narrow exactly which lines they cover
# (e.g. "apt-get install -y --no-install-recommends bubblewrap socat") so that
# any future apt-get install with different packages is still flagged.
is_line_allowlisted() {
  local file="$1"
  local line_content="$2"

  while IFS='|' read -r al_file al_pattern; do
    [[ -z "$al_file" ]] && continue
    if [[ "$file" == "$al_file" ]]; then
      if [[ "$line_content" == *"$al_pattern"* ]]; then
        return 0
      fi
    fi
  done <<< "$ALLOWLIST_ENTRIES"
  return 1
}

# ── Collect files to scan ────────────────────────────────────────────────────

bold "Supply Chain Lint"
echo "======================================================================"
echo ""

# Collect action.yml/yaml and sibling .sh files, excluding:
#   - .git/
#   - .github/ dirs inside vendored actions
#   - __tests__/, __test__/, test/, tests/ dirs (vendored test fixtures)
#   - scripts/ dirs in vendored actions (dev scripts, not runtime)
FILES_TO_SCAN=$(mktemp)

# Directories to skip inside vendored actions
SKIP_DIRS="\.git|\.github|__tests__|__test__|/tests/|/test/"

# Helper: filter out the lint script's own directory from scan results
self_exclude_filter() {
  if [[ -n "$SELF_EXCLUDE" ]]; then
    grep -v "^${SELF_EXCLUDE}/" || true
  else
    cat
  fi
}

# Action files (top-level action.yml/yaml that define the action)
find . -name ".git" -prune -o \( -name "action.yml" -o -name "action.yaml" \) -print 2>/dev/null | \
  (grep -vE "/(${SKIP_DIRS})/" || true) | sed 's|^\./||' | self_exclude_filter | sort >> "$FILES_TO_SCAN"

# Shell scripts in the same directories as action files (runtime scripts)
find . -name ".git" -prune -o \( -name "action.yml" -o -name "action.yaml" \) -print 2>/dev/null | \
  (grep -vE "/(${SKIP_DIRS})/" || true) | while IFS= read -r f; do
    [[ -z "$f" ]] && continue
    find "$(dirname "$f")" -maxdepth 3 -name "*.sh" 2>/dev/null
  done | (grep -vE "/(${SKIP_DIRS})/" || true) | sed 's|^\./||' | self_exclude_filter | sort -u >> "$FILES_TO_SCAN"

# SKIP_DIRS above also excludes the repo's own composite actions under
# .github/actions/; add them back unless SCAN_LOCAL_ACTIONS=false. Test
# dirs nested inside them stay excluded.
if [[ "${SCAN_LOCAL_ACTIONS:-true}" != "false" && -d ".github/actions" ]]; then
  LOCAL_SKIP_DIRS="\.git|__tests__|__test__|/tests/|/test/"

  find ./.github/actions -name ".git" -prune -o \( -name "action.yml" -o -name "action.yaml" \) -print 2>/dev/null | \
    (grep -vE "/(${LOCAL_SKIP_DIRS})/" || true) | sed 's|^\./||' | self_exclude_filter | sort >> "$FILES_TO_SCAN"

  find ./.github/actions -name ".git" -prune -o \( -name "action.yml" -o -name "action.yaml" \) -print 2>/dev/null | \
    (grep -vE "/(${LOCAL_SKIP_DIRS})/" || true) | while IFS= read -r f; do
      [[ -z "$f" ]] && continue
      find "$(dirname "$f")" -maxdepth 3 -name "*.sh" 2>/dev/null
    done | (grep -vE "/(${LOCAL_SKIP_DIRS})/" || true) | sed 's|^\./||' | self_exclude_filter | sort -u >> "$FILES_TO_SCAN"
fi

FILE_COUNT=$(wc -l < "$FILES_TO_SCAN" | tr -d ' ')
info "Scanning ${FILE_COUNT} files..."
echo ""

# ── Scan ─────────────────────────────────────────────────────────────────────

while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  [[ ! -f "$file" ]] && continue

  for pattern_entry in "${PATTERNS[@]}"; do
    # Split on " :: " delimiter and trim whitespace
    category=$(echo "$pattern_entry"    | awk -F' :: ' '{print $1}' | sed 's/^ *//;s/ *$//')
    grep_pat=$(echo "$pattern_entry"    | awk -F' :: ' '{print $2}' | sed 's/^ *//;s/ *$//')
    detail=$(echo "$pattern_entry"      | awk -F' :: ' '{print $3}' | sed 's/^ *//;s/ *$//')
    exclude_pat=$(echo "$pattern_entry" | awk -F' :: ' '{print $4}' | sed 's/^ *//;s/ *$//')

    # Use grep -E to find matching lines, filtering out comments/echo/description
    matches=$(grep -nE -- "$grep_pat" "$file" 2>/dev/null | \
      grep -vE '^\s*#|^[0-9]+:\s*#' | \
      grep -vE '^\s*echo |^[0-9]+:\s*echo |^[0-9]+:\s*printf ' | \
      grep -vE '^\s*description:|^[0-9]+:\s*description:' || true)

    [[ -z "$matches" ]] && continue

    # Apply exclude patterns if present (comma-separated, each applied independently)
    if [[ -n "$exclude_pat" ]]; then
      IFS=',' read -ra excludes <<< "$exclude_pat"
      for ex in "${excludes[@]}"; do
        matches=$(echo "$matches" | grep -vF -- "$ex" || true)
        [[ -z "$matches" ]] && break
      done
      [[ -z "$matches" ]] && continue
    fi

    # Drop allowlisted lines (matched per-line against actual content).
    unallowlisted=""
    while IFS= read -r match_line; do
      [[ -z "$match_line" ]] && continue
      # Strip the leading "lineno:" prefix from grep -n output
      content="${match_line#*:}"
      if ! is_line_allowlisted "$file" "$content"; then
        unallowlisted="${unallowlisted}${match_line}"$'\n'
      fi
    done <<< "$matches"

    # Record one violation per file per pattern (not per line)
    if [[ -n "$(printf '%s' "$unallowlisted" | tr -d '[:space:]')" ]]; then
      echo "${file}|${category}|${detail}" >> "$VIOLATIONS_FILE"
    fi
  done
done < "$FILES_TO_SCAN"

rm -f "$FILES_TO_SCAN"

# ── Results ──────────────────────────────────────────────────────────────────

echo ""
bold "Results"
echo "======================================================================"

if [[ ! -s "$VIOLATIONS_FILE" ]]; then
  echo ""
  info "No supply chain violations found."
  echo ""
  if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
    echo "violations_found=false" >> "$GITHUB_OUTPUT"
    echo "violation_count=0" >> "$GITHUB_OUTPUT"
  fi
  exit 0
fi

UNIQUE_VIOLATIONS=$(sort -u "$VIOLATIONS_FILE")
VIOLATION_COUNT=$(echo "$UNIQUE_VIOLATIONS" | wc -l | tr -d ' ')

if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
  echo "violations_found=true" >> "$GITHUB_OUTPUT"
  echo "violation_count=$VIOLATION_COUNT" >> "$GITHUB_OUTPUT"
fi

echo ""
error "Found ${VIOLATION_COUNT} supply chain violation(s):"
echo ""

echo "$UNIQUE_VIOLATIONS" | while IFS='|' read -r v_file v_category v_detail; do
  echo -e "  ${RED}●${NC} ${BOLD}${v_file}${NC}"
  echo -e "    Category: ${v_category}"
  echo -e "    Detail:   ${v_detail}"
  echo ""
done

echo "======================================================================"
error "Supply chain lint failed with ${VIOLATION_COUNT} violation(s)."
echo ""
echo "To fix: either resolve the issue directly, or add an entry to"
echo "  the supply-chain-allowlist.yml (built-in or repo-specific)"
echo "with a justification."
echo ""
exit 1
