/**
 * This module contains methods to validate extended public keys and BIP32
 * derivation path segments.
 *
 * @module validation
 */

import {
  validateExtendedPublicKey,
  validateAddress,
  validateBIP32Index,
} from "@caravan/bitcoin"
import { getNetworkFromExtPubKey } from "./metadata"
import { convertToXPUB } from "./conversion"
import { Purpose } from "./purpose"
import { harden } from "./utils"
import { APOSTROPHE, COIN_PREFIX } from "./constants"

/**
 * Returns true if the given `extPubKey` matches the given `network`, false otherwise.
 *
 * @param  {string} extPubKey - the extended public key
 * @param  {NETWORK} network - the network to check against
 *
 * @returns {boolean}
 */
function isNetworkMatch(extPubKey, network) {
  return extPubKey && getNetworkFromExtPubKey(extPubKey) === network
}

/**
 * Returns true if the given `extPubKey` is valid for the given `network`,
 * false otherwise.
 *
 * @param  {string} extPubKey - the extended public key
 * @param  {NETWORK} network - the network to check against
 *
 * @returns {boolean}
 */
function isValidExtPubKey(extPubKey, network) {
  if (!isNetworkMatch(extPubKey, network)) {
    return false
  }
  try {
    const convertedExtPubKey = convertToXPUB(extPubKey, network)
    // validateExtendedPublicKey expects "xpub..." or "tpub..."
    return validateExtendedPublicKey(convertedExtPubKey, network) === ""
  } catch (error) {
    return false
  }
}

/**
 * Returns true if the given bitcoin `address` is valid for the given
 * `network`, false otherwise.
 *
 * @param  {string} address - the given bitcoin address
 * @param  {NETWORK} network - the network to check against
 *
 * @returns {boolean}
 */
function isValidAddress(address, network) {
  return validateAddress(address, network) === ""
}

/**
 * Returns true if the given derivation purpose is valid, false otherwise.
 *
 * @param  {module:purpose~Purpose} purpose - the derivation purpose
 *
 * @returns {boolean}
 */
function isValidPurpose(purpose) {
  switch (purpose) {
    case Purpose.P2PKH:
    case Purpose.P2SH:
    case Purpose.P2WPKH:
    case Purpose.P2TR:
      return true
    default:
      return false
  }
}

/**
 * Returns true if the given index is valid, false otherwise.
 *
 * @param  {number} index - the BIP32 index to check
 *
 * @returns {boolean}
 */
function isValidIndex(index) {
  const indexString = harden(String(index))
  try {
    return validateBIP32Index(indexString, { mode: "hardened" }) === ""
  } catch (error) {
    return false
  }
}

/**
 * Returns true if the given chain index is valid, false otherwise.
 *
 * @param  {number} index - the chain (internal / external) index to check
 *
 * @returns {boolean}
 */
function isValidChainIndex(index) {
  const indexString = String(index)
  const validChains = ["0", "1"]
  if (validChains.indexOf(indexString) === -1) {
    return false
  }
  return true
}

/**
 * Returns true if the path segment is hardened, false otherwise.
 *
 * @param  {string} segment - the path segment to check
 *
 * @returns {boolean}
 */
function isHardened(segment) {
  return segment.includes(APOSTROPHE)
}

/**
 * Returns true if the given BIP32 path segment is valid, false otherwise.
 *
 * @param  {string} segment - the path segment to check
 *
 * @returns {boolean}
 */
function isValidPathSegment(segment) {
  let unhardened = segment
  if (isHardened(segment)) {
    unhardened = segment.slice(0, -1)
  }

  switch (unhardened) {
    case COIN_PREFIX:
      return true
    case Purpose.P2PKH:
    case Purpose.P2SH:
    case Purpose.P2WPKH:
    case Purpose.P2TR:
      return true
    default:
      return isValidIndex(unhardened)
  }
}

export {
  isNetworkMatch,
  isValidExtPubKey,
  isValidAddress,
  isValidPurpose,
  isValidIndex,
  isValidChainIndex,
  isValidPathSegment,
}
