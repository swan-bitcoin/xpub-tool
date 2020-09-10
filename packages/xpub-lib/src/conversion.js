import { NETWORKS, convertExtendedPublicKey } from "unchained-bitcoin"

function convertToBIP32(xpub, network) {
  const targetPrefix = network === NETWORKS.MAINNET ? XPUB : TPUB
  return convertExtendedPublicKey(xpub, targetPrefix)
}

export { convertToBIP32 }
