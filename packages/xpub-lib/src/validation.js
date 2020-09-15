import {
  validateExtendedPublicKey,
  validateBIP32Index,
} from "unchained-bitcoin"
import { getNetworkFromExtPubKey } from "./metadata"
import { convertToXPUB } from "./conversion"
import { Purpose } from "./purpose"
import { harden } from "./utils"
import { APOSTROPHE, COIN_PREFIX } from "./constants"

function isNetworkMatch(extPubKey, network) {
  return extPubKey && getNetworkFromExtPubKey(extPubKey) === network
}

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

function isValidPurpose(purpose) {
  switch (purpose) {
    case Purpose.P2PKH:
    case Purpose.P2SH:
    case Purpose.P2WPKH:
      return true
    default:
      return false
  }
}

function isValidIndex(index) {
  const indexString = harden(String(index))
  try {
    return validateBIP32Index(indexString, { mode: "hardened" }) === ""
  } catch (error) {
    return false
  }
}

function isHardened(segment) {
  return segment.includes(APOSTROPHE)
}

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
      return true
    default:
      return isValidIndex(unhardened)
  }
}

export {
  isNetworkMatch,
  isValidExtPubKey,
  isValidPurpose,
  isValidIndex,
  isValidPathSegment,
}
