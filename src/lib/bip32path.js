import { MAINNET } from "unchained-bitcoin"

// m / purpose' / coin_type' / account' / change / address_index
// Example: "m/44'/0'/0'"
const bip32PurposePrefixes = [44, 49, 84]
const separator = "/"
const apostrophe = "'"

// "Account" definitions as used by wallets
const AccountType = {
  "44": "Legacy", // 1addresses
  "49": "SegWit", // 3addresses, SegWit = default
  "84": "Native SegWit", // bc1addresses
}

// TODO: Rename bip32 -> derivationPaths (we are actually dealing with bip44/49/84 paths)

function bip32PartialPath(accountNumber, keyIndex) {
  return [accountNumber, keyIndex].join(separator)
}

function bip32AccountPath(
  purpose,
  accountNumber,
  network = MAINNET,
  coinPrefix = "m"
) {
  return [
    coinPrefix,
    harden(purpose),
    harden(network === MAINNET ? 0 : 1),
    accountNumber,
  ].join(separator)
}
function harden(string) {
  return string + apostrophe
}

function bip32FullPath(
  purpose,
  accountNumber,
  keyIndex,
  network = MAINNET,
  coinPrefix = "m",
  change = 0
) {
  return [
    bip32AccountPath(purpose, accountNumber, network, coinPrefix),
    change,
    keyIndex,
  ].join(separator)
}

function bip32HumanReadablePath(bip32Path) {
  // m / purpose' / coin_type' / account' / change / address_index
  // Example:
  //   bip32HumanReadablePath("m/49'/0'/3'/0/1")
  //   -> "SegWit Account #3"
  let pathSegments = bip32Path.split(separator)
  let purpose = pathSegments[1].replace(apostrophe, "")
  let account = Number(pathSegments[3].replace(apostrophe, "")) + 1
  return AccountType[purpose.toString()] + " Account #" + account
}

export {
  bip32AccountPath,
  bip32FullPath,
  bip32PartialPath,
  bip32HumanReadablePath,
  bip32PurposePrefixes,
}
