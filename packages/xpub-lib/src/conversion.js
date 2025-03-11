/**
 * This module defines helper functions for extended public key conversion.
 *
 * @module conversion
 */

import { Network, convertExtendedPublicKey } from "@caravan/bitcoin"
import { TYPE } from "./types"

/**
 * Convert any extended public key (ypub, zpub, etc.) to the XPUB format
 * defined in BIP44. Resulting key will be an xpub (mainnet) or a tpub
 * (testnet).
 *
 * @param  {string} extPubKey - the extended public key to convert
 * @param  {string} network - the network to convert to (MAINNET or TESTNET)
 *
 * @returns {(string|object)} converted extended public key or error object
 * with the failed key and error message
 */
function convertToXPUB(extPubKey, network) {
  const targetPrefix = network === Network.MAINNET ? TYPE.XPUB : TYPE.TPUB
  return convertExtendedPublicKey(extPubKey, targetPrefix)
}

export { convertToXPUB }
