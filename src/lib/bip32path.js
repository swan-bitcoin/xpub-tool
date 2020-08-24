import { MAINNET } from "unchained-bitcoin"

// m / purpose' / coin_type' / account' / change / address_index
// Example: "m/44'/0'/0'"
const bip32PurposePrefixes = [44, 49, 84]
const separator = "/"

// "Account" definitions as used by wallets
const AccountType = {
  "44": "Legacy", // 1addresses
  "49": "SegWit", // 3addresses, SegWit = default
  "84": "Native SegWit", // bc1addresses
}

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
  return string + "'"
}

function bip32HumanReadablePath(bip32Path) {
  // m / purpose' / coin_type' / account' / change / address_index
  // Example: "m/44'/0'/0'"
  let pathSegments = bip32Path.split("/")
  let purpose = pathSegments[1].replace("'", "")
  let account = Number(pathSegments[3].replace("'", "")) + 1
  return AccountType[purpose.toString()] + " Account #" + account
}

export {
  bip32AccountPath,
  bip32PartialPath,
  bip32HumanReadablePath,
  bip32PurposePrefixes,
}
