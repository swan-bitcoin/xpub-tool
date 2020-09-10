import { NETWORKS, convertExtendedPublicKey } from "unchained-bitcoin"
import { TYPE } from "./types"

function convertToBIP32(xpub, network) {
  const targetPrefix = network === NETWORKS.MAINNET ? TYPE.XPUB : TYPE.TPUB
  return convertExtendedPublicKey(xpub, targetPrefix)
}

export { convertToBIP32 }
