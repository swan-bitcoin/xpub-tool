import { NETWORKS, convertExtendedPublicKey } from "unchained-bitcoin"
import TYPES from "./types.js"

function convertToBIP32(xpub, network) {
  const targetPrefix = network === NETWORKS.MAINNET ? TYPES.XPUB : TYPES.TPUB
  return convertExtendedPublicKey(xpub, targetPrefix)
}

export { convertToBIP32 }
