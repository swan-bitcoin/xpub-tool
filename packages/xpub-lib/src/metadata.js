import { NETWORKS, ExtendedPublicKey } from "unchained-bitcoin"
import { isValidXpub } from "./validation"
import Purpose from "./purpose"
import TYPE from "./types"

function maskKey(key, pre = 15, post = 15, placeholder = "[...]") {
  const beginning = key.substr(0, pre)
  const ending = key.substr(key.length - post, key.length)
  return beginning + placeholder + ending
}

function getNetworkFromXpub(xpub) {
  const prefix = xpub.slice(0, 4)
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

function getXpubType(xpub) {
  const network = getNetworkFromXpub(xpub)
  if (!isValidXpub(xpub, network)) {
    return undefined
  }

  const prefix = xpub.slice(0, 4)
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

function getXpubMetadata(xpub) {
  try {
    const xpubObj = ExtendedPublicKey.fromBase58(xpub)

    return {
      type: getXpubType(xpub),
      index: xpubObj.index,
      depth: xpubObj.depth,
      pubkey: xpubObj.pubkey,
      chaincode: xpubObj.chaincode,
      parentFingerprint: xpubObj.parentFingerprint,
      network: getNetworkFromXpub(xpub),
      version: xpubObj.version,
    }
  } catch (error) {
    return {}
  }
}

export { maskKey, getXpubType, getXpubMetadata, getNetworkFromXpub }
