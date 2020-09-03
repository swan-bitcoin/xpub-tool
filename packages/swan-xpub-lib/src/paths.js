import { NETWORKS } from "unchained-bitcoin"

import { AccountTypeName } from "./purpose"

const SEPARATOR = "/"
const APOSTROPHE = "'"
const COIN_PREFIX = "m"

function partialKeyDerivationPath({ accountNumber, keyIndex }) {
  return [accountNumber, keyIndex].join(SEPARATOR)
}

function harden(string) {
  return string + APOSTROPHE
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
  //   bip32HumanReadablePath("m/49'/0'/3'/0/1")
  //   -> "SegWit Account #3"
  const pathSegments = bip32Path.split(SEPARATOR)
  const purpose = pathSegments[1].replace(APOSTROPHE, "")
  const account = Number(pathSegments[3].replace(APOSTROPHE, "")) + 1
  return `${accountString} #${account} (${AccountTypeName[purpose]})`
}

export {
  accountDerivationPath,
  fullDerivationPath,
  partialKeyDerivationPath,
  humanReadableDerivationPath,
}