/**
 * This module retrieves metadata from extended public keys.
 *
 * @module metadata
 */

import { NETWORKS, ExtendedPublicKey } from "unchained-bitcoin"
import { Purpose } from "./purpose"
import { TYPE } from "./types"

/**
 * Get network type from extended public key format.
 * XPUB/YPUB/ZPUB = mainnet,
 * TPUB/UPUB/VPUB = testnet.
 *
 * @param  {string} extPubKey - an extended public key
 *
 * @returns {NETWORK} the associated network. See unchained-bitcoin/networks
 */
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

/**
 * Get purpose from an extended public key, dependent on key type
 * (xpub/ypub/zpub, or tpub/upub/vpub).
 *
 * @param  {string} extPubKey - an extended public key
 *
 * @returns {module:purpose~Purpose} the purpose (address type) of the key
 */
function getPurposeFromExtPubKey(extPubKey) {
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

/**
 * Extended public key metadata.
 *
 * @typedef {object} metadata
 * @property {module:type~TYPE} type - the extended public key type (xpub/ypub/zpub/tpub/upub/vpub)
 * @property {number} index - the key index
 * @property {number} depth - the depth of the derivation path
 * @property {string} pubkey - the corresponding (non-extended) public key
 * @property {string} chaincode - the chaincode
 * @property {string} parentFingerprint - the fingerprint of the parent key
 * @property {NETWORK} network - the associated network (TESTNET or MAINNET)
 */

/**
 * Retrieves metadata from a given extended public key.
 *
 * @param  {string} extPubKey - an extended public key
 *
 * @returns {Metadata} a {@link module:metadata~metadata} object
 */
function getExtPubKeyMetadata(extPubKey) {
  try {
    const xpubObj = ExtendedPublicKey.fromBase58(extPubKey)

    return {
      type: getPurposeFromExtPubKey(extPubKey),
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

export {
  getPurposeFromExtPubKey,
  getExtPubKeyMetadata,
  getNetworkFromExtPubKey,
}
