import * as bitcoin from "bitcoinjs-lib"
import {
  deriveChildPublicKey,
  networkData,
  NETWORKS,
  ExtendedPublicKey,
  validateExtendedPublicKey,
  convertExtendedPublicKey,
} from "unchained-bitcoin"
import { fullDerivationPath, partialKeyDerivationPath } from "./paths"
import Purpose from "./purpose"

const DEFAULT_NETWORK = NETWORKS.TESTNET
const DEFAULT_PURPOSE = Purpose.P2WPKH

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

function deriveAddress({ purpose, pubkey, network }) {
  switch (purpose) {
    case Purpose.P2PKH: {
      const { address: oneAddress } = bitcoin.payments.p2pkh({
        pubkey,
        network: networkData(network),
      })
      return oneAddress
    }
    case Purpose.P2SH: {
      const { address: threeAddress } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({
          pubkey,
          network: networkData(network),
        }),
      })
      return threeAddress
    }
    default:
    case Purpose.P2WPKH: {
      const { address: bc1Address } = bitcoin.payments.p2wpkh({
        pubkey,
        network: networkData(network),
      })
      return bc1Address
    }
  }
}

function addressFromXpub({ xpub, accountNumber, keyIndex, purpose, network }) {
  if (!isValidXpub(xpub, network)) {
    throw TypeError("Invalid extended public key")
  }
  const partialPath = partialKeyDerivationPath({ accountNumber, keyIndex })
  const fullPath = fullDerivationPath({
    purpose,
    accountNumber,
    keyIndex,
    network,
  })
  const convertedXpub = convertToBIP32(xpub, network)
  const childPubKey = deriveChildPublicKey(convertedXpub, partialPath, network)
  const keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(childPubKey, "hex"))
  const pubkey = keyPair.publicKey
  return {
    path: fullPath,
    address: deriveAddress({ purpose, pubkey, network }),
  }
}

function addressesFromXpub({
  xpub,
  addressCount,
  accountNumber = 0,
  purpose = DEFAULT_PURPOSE,
  network = DEFAULT_NETWORK,
}) {
  const addresses = []

  for (let keyIndex = 0; keyIndex < addressCount; keyIndex += 1) {
    const { path, address } = addressFromXpub({
      xpub,
      accountNumber,
      keyIndex,
      purpose,
      network,
    })

    addresses.push({ path, address })
  }

  return addresses
}

export {
  maskKey,
  isValidXpub,
  getXpubType,
  addressFromXpub,
  addressesFromXpub,
  getXpubMetadata,
}
