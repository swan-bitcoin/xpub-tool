import {
  NETWORKS,
  ExtendedPublicKey,
  convertExtendedPublicKey,
} from "unchained-bitcoin"
import { isValidXpub } from "./validation"
import Purpose from "./purpose"

const XPUB = "xpub"
const YPUB = "ypub"
const ZPUB = "zpub"
const TPUB = "tpub"
const UPUB = "upub"
const VPUB = "vpub"

function maskKey(key, pre = 15, post = 15, placeholder = "[...]") {
  const beginning = key.substr(0, pre)
  const ending = key.substr(key.length - post, key.length)
  return beginning + placeholder + ending
}

function convertToBIP32(xpub, network) {
  const targetPrefix = network === NETWORKS.MAINNET ? XPUB : TPUB
  return convertExtendedPublicKey(xpub, targetPrefix)
}

function getNetworkFromXpub(xpub) {
  const prefix = xpub.slice(0, 4)
  switch (prefix) {
    case XPUB:
    case YPUB:
    case ZPUB:
      return NETWORKS.MAINNET
    case TPUB:
    case UPUB:
    case VPUB:
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
    case XPUB:
    case TPUB:
      return Purpose.P2PKH
    case YPUB:
    case UPUB:
      return Purpose.P2SH
    case ZPUB:
    case VPUB:
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

export {
  maskKey,
  getXpubType,
  getXpubMetadata,
  convertToBIP32,
  getNetworkFromXpub,
}
