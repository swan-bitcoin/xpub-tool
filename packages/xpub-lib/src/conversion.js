import { NETWORKS, convertExtendedPublicKey } from "unchained-bitcoin"
import { TYPE } from "./types"

function convertToBIP32(extPubKey, network) {
  const targetPrefix = network === NETWORKS.MAINNET ? TYPE.XPUB : TYPE.TPUB
  return convertExtendedPublicKey(extPubKey, targetPrefix)
}

export { convertToBIP32 }
