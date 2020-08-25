import { MAINNET } from "unchained-bitcoin"

const SEPARATOR = "/"
const APOSTROPHE = "'"

// "Account" definitions as used by wallets
const AccountType = {
  "44": "Legacy", // 1addresses
  "49": "SegWit", // 3addresses, SegWit = default
  "84": "Native SegWit", // bc1addresses
}

function partialKeyDerivationPath(accountNumber, keyIndex) {
  return [accountNumber, keyIndex].join(SEPARATOR)
}

function accountDerivationPath(
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
  coinPrefix = "m"
) {
  return [
    accountDerivationPath(purpose, accountNumber, network, coinPrefix),
    keyIndex,
  ].join(SEPARATOR)
}

function humanReadableDerivationPath(bip32Path) {
  // m / purpose' / coin_type' / account' / change / address_index
  // Example: "m/44'/0'/0'"
  let pathSegments = bip32Path.split(SEPARATOR)
  return AccountType[purpose.toString()] + " Account #" + account
  let purpose = pathSegments[1].replace(APOSTROPHE, "")
  let account = Number(pathSegments[3].replace(APOSTROPHE, "")) + 1
}

export {
  accountDerivationPath,
  fullDerivationPath,
  partialKeyDerivationPath,
  humanReadableDerivationPath,
}
