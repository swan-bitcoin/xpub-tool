import { NETWORKS, ExtendedPublicKey } from "unchained-bitcoin"
import { Purpose } from "./purpose"
import { TYPE } from "./types"

function getNetworkFromExtPubKey(extPubKey) {
  const prefix = extPubKey.slice(0, 4)
  switch (prefix) {
    case TYPE.XPUB:
    case TYPE.YPUB:
    case TYPE.ZPUB:
      return NETWORKS.MAINNET
    case TYPE.TPUB:
    case TYPE.UPUB:
    case TYPE.VPUB:
      return NETWORKS.TESTNET
    default:
      return undefined
  }
}

function getExtPubKeyType(extPubKey) {
  const prefix = extPubKey.slice(0, 4)
  switch (prefix) {
    case TYPE.XPUB:
    case TYPE.TPUB:
      return Purpose.P2PKH
    case TYPE.YPUB:
    case TYPE.UPUB:
      return Purpose.P2SH
    case TYPE.ZPUB:
    case TYPE.VPUB:
      return Purpose.P2WPKH
    default:
      return undefined
  }
}

function getExtPubKeyMetadata(extPubKey) {
  try {
    const xpubObj = ExtendedPublicKey.fromBase58(extPubKey)

    return {
      type: getExtPubKeyType(extPubKey),
      index: xpubObj.index,
      depth: xpubObj.depth,
      pubkey: xpubObj.pubkey,
      chaincode: xpubObj.chaincode,
      parentFingerprint: xpubObj.parentFingerprint,
      network: getNetworkFromExtPubKey(extPubKey),
      version: xpubObj.version,
    }
  } catch (error) {
    return {}
  }
}

export { getExtPubKeyType, getExtPubKeyMetadata, getNetworkFromExtPubKey }
