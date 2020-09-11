import { NETWORKS } from "unchained-bitcoin"
import { harden } from "./utils"
import { isValidIndex } from "./validation"
import { AccountTypeName } from "./purpose"
import { SEPARATOR, APOSTROPHE, COIN_PREFIX } from "./constants"

function partialKeyDerivationPath({ accountNumber = 0, keyIndex = 0 }) {
  if (isValidIndex(accountNumber) && isValidIndex(keyIndex)) {
    return [accountNumber, keyIndex].join(SEPARATOR)
  }
  return undefined
}

function accountDerivationPath({
  coinPrefix = COIN_PREFIX,
  purpose,
  network = NETWORKS.TESTNET,
  accountNumber,
}) {
  return [
    coinPrefix,
    harden(purpose),
    harden(network === NETWORKS.MAINNET ? 0 : 1),
    harden(accountNumber),
  ].join(SEPARATOR)
}

function fullDerivationPath({
  coinPrefix = COIN_PREFIX,
  purpose,
  network = NETWORKS.TESTNET,
  accountNumber,
  change = 0,
  keyIndex,
}) {
  return [
    accountDerivationPath({ purpose, accountNumber, network, coinPrefix }),
    change,
    keyIndex,
  ].join(SEPARATOR)
}

function humanReadableDerivationPath({ bip32Path, accountString = "Account" }) {
  // Example:
  //   bip32HumanReadablePath("m/49'/0'/2'/0/1")
  //   -> "Account #3 (SegWit)"
  const pathSegments = bip32Path.split(SEPARATOR)
  const purpose = pathSegments[1].replace(APOSTROPHE, "")
  const account = Number(pathSegments[3].replace(APOSTROPHE, "")) + 1
  return `${accountString} #${account} (${AccountTypeName[purpose]})`
}

export {
  APOSTROPHE,
  accountDerivationPath,
  fullDerivationPath,
  partialKeyDerivationPath,
  humanReadableDerivationPath,
  harden,
}
