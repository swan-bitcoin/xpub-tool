import { MAINNET } from "unchained-bitcoin"

const SEPARATOR = "/"
const APOSTROPHE = "'"
const COIN_PREFIX = "m"

// Human-readable account names as used by wallets
const AccountTypeName = {
  44: "Legacy", // 1addresses
  49: "SegWit", // 3addresses, SegWit = default
  84: "Native SegWit", // bc1addresses
}

function partialKeyDerivationPath(accountNumber, keyIndex) {
  return [accountNumber, keyIndex].join(SEPARATOR)
}

function accountDerivationPath(
  purpose,
  accountNumber,
  network = MAINNET,
  coinPrefix = COIN_PREFIX
) {
  return [
    coinPrefix,
    harden(purpose),
    harden(network === MAINNET ? 0 : 1),
    harden(accountNumber),
  ].join(SEPARATOR)
}
function harden(string) {
  return string + APOSTROPHE
}

function fullDerivationPath(
  purpose,
  accountNumber,
  keyIndex,
  network = MAINNET,
  coinPrefix = COIN_PREFIX,
  change = 0
) {
  return [
    accountDerivationPath(purpose, accountNumber, network, coinPrefix),
    change,
    keyIndex,
  ].join(SEPARATOR)
}

function humanReadableDerivationPath(bip32Path) {
  // Example:
  //   bip32HumanReadablePath("m/49'/0'/3'/0/1")
  //   -> "SegWit Account #3"
  let pathSegments = bip32Path.split(SEPARATOR)
  let purpose = pathSegments[1].replace(APOSTROPHE, "")
  let account = Number(pathSegments[3].replace(APOSTROPHE, "")) + 1
  return AccountTypeName[purpose] + " Account #" + account
}

export {
  accountDerivationPath,
  fullDerivationPath,
  partialKeyDerivationPath,
  humanReadableDerivationPath,
}
