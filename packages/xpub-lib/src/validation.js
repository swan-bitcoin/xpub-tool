import { validateExtendedPublicKey } from "unchained-bitcoin"
import { convertToBIP32, getNetworkFromXpub } from "./xpub"

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

export { isNetworkMatch, isValidXpub }
