/**
 * This module defines functions to construct valid BIP32 derivation paths.
 *
 * @module paths
 */

import { NETWORKS } from "unchained-bitcoin"
import { harden } from "./utils"
import { isValidIndex, isValidChainIndex } from "./validation"
import { AccountTypeName } from "./purpose"
import { SEPARATOR, APOSTROPHE, COIN_PREFIX } from "./constants"
import { getAccountFromExtPubKey } from "./metadata"

/**
 * Construct a partial key derivation path from a given `change` and `keyIndex`.
 *
 * @param  {number} [change=0] - the unhardened chain index
 * @param  {number} [keyIndex=0] - the unhardened key index
 *
 * @returns {string} a partial derivation path
 */
function partialKeyDerivationPath({ change = 0, keyIndex = 0 }) {
  if (isValidChainIndex(change) && isValidIndex(keyIndex)) {
    return [change, keyIndex].join(SEPARATOR)
  }
  return undefined
}

/**
 * Construct an account derivation path given a `purpose` and an `accountNumber`.
 *
 * @param  {string} [coinPrefix=COIN_PREFIX] - the coin prefix, defaulting to "m" for bitcoin
 * @param  {module:purpose~Purpose} purpose - the derivation purpose
 * @param  {NETWORK} [network=NETWORKS.TESTNET] - the target network (TESTNET or MAINNET)
 * @param  {number} accountNumber - the account number, starting with 0
 *
 * @returns {string} the account derivation path, e.g. "m/44'/0'/3'"
 */
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

/**
 * Construct a full derivation path as defined by BIP44 given `purpose`,
 * `accountNumber`, and `keyIndex`.
 *
 * @param  {string} convertedExtPubKey - a BIP44 extended public key
 * @param  {string} [coinPrefix=COIN_PREFIX] - the coin prefix, defaulting to "m" for bitcoin
 * @param  {module:purpose~Purpose} purpose - derivation purpose
 * @param  {NETWORK} [network=NETWORKS.TESTNET] - target network (TESTNET or MAINNET)
 * @param  {number} accountNumber - the account number, starting with 0
 * @param  {number} [change=0] - change (0 = external chain, 1 = internal chain / change)
 * @param {number} keyIndex - the key index, i.e. the number of the key that
 * should be derived from the extended public key
 *
 * @returns  {string} the full derivation path, e.g. "m/44'/0'/3'/0/1"
 */
function fullDerivationPath({
  convertedExtPubKey,
  coinPrefix = COIN_PREFIX,
  purpose,
  network = NETWORKS.TESTNET,
  change = 0,
  keyIndex,
}) {
  return [
    accountDerivationPath({
      purpose,
      accountNumber: getAccountFromExtPubKey(convertedExtPubKey),
      network,
      coinPrefix,
    }),
    change,
    keyIndex,
  ].join(SEPARATOR)
}

/**
 * Return a human-readable string for a BIP32 derivation path.
 *
 * @param  {string} bip32Path - a BIP32 derivation path
 * @param {string} [accountString="Account"] - the string to display before the
 * account number
 *
 * @example
 * humanReadableDerivationPath("m/49'/0'/2'/0/1")
 * // --> "Account #3 (SegWit)"
 *
 * @returns {string} a human readable derivation path
 */
function humanReadableDerivationPath({ bip32Path, accountString = "Account" }) {
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
}
