import * as bitcoin from "bitcoinjs-lib"
import {
  deriveChildPublicKey,
  networkData,
  NETWORKS,
  ExtendedPublicKey,
  validateExtendedPublicKey,
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

function isValidXpub(xpub, network) {
  return validateExtendedPublicKey(xpub, network) === ""
}

function getXpubMetadata(xpub) {
  try {
    const xpubObj = ExtendedPublicKey.fromBase58(xpub)

    return {
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
  const partialPath = partialKeyDerivationPath({ accountNumber, keyIndex })
  const fullPath = fullDerivationPath({
    purpose,
    accountNumber,
    keyIndex,
    network,
  })
  const childPubKey = deriveChildPublicKey(xpub, partialPath, network)
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

export { Purpose, maskKey, isValidXpub, addressesFromXpub, getXpubMetadata }
