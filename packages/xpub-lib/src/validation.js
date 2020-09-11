import { validateExtendedPublicKey } from "unchained-bitcoin"
import { getNetworkFromXpub } from "./metadata"
import { convertToBIP32 } from "./conversion"
import { Purpose } from "./purpose"
import { APOSTROPHE, COIN_PREFIX } from "./constants"

const MAX_INDEX = 2147483648

function isNetworkMatch(xpub, network) {
  return getNetworkFromXpub(xpub) === network
}

function isValidXpub(xpub, network) {
  if (!isNetworkMatch(xpub, network)) {
    return false
  }
  try {
    const convertedXpub = convertToBIP32(xpub, network)
    // validateExtendedPublicKey expects "xpub..." or "tpub..."
    return validateExtendedPublicKey(convertedXpub, network) === ""
  } catch (error) {
    return false
  }
}

function isValidIndex(index) {
  try {
    const idx = Number(index)
    return idx >= 0 && idx < MAX_INDEX
  } catch {
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

export { isNetworkMatch, isValidXpub, isValidIndex, isValidPathSegment }
