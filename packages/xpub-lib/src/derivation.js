/**
 * This module defines functions for address derivation.
 *
 * @module derivation
 */

import * as bitcoin from "bitcoinjs-lib"
import * as ecc from 'tiny-secp256k1';
import { toXOnly } from 'bitcoinjs-lib/src/psbt/bip371';
import { deriveChildPublicKey, networkData, Network } from "@caravan/bitcoin"
import { fullDerivationPath, partialKeyDerivationPath } from "./paths"
import {
  isValidExtPubKey,
  isValidIndex,
  isValidPurpose,
  isValidChainIndex,
} from "./validation"
import { convertToXPUB } from "./conversion"
import { Purpose } from "./purpose"

/**
 * Default network to use for address derivation.
 *
 * @constant
 * @type {string}
 * @default Network.TESTNET
 * */
const DEFAULT_NETWORK = Network.TESTNET
/**
 * Default purpose to use for address derivation.
 *
 * @constant
 * @type {string}
 * @default Purpose.P2WPKH
 * */
const DEFAULT_PURPOSE = Purpose.P2WPKH

bitcoin.initEccLib(ecc);

/**
 * Derive a single address from a public key.
 *
 * @param {module:purpose~Purpose} purpose - the purpose dictates the derived
 * address type (P2PKH = 1address, P2SH = 3address, P2WPKH = bc1qaddress, P2TR = bc1paddress)
 * @param  {Buffer} pubkey - the Buffer representation public key to derive from
 * @param  {NETWORK} network - the network to use (MAINNET or TESTNET)
 *
 * @returns {object|undefined} derived address
 */
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
    case Purpose.P2WPKH: {
      const { address: bc1qAddress } = bitcoin.payments.p2wpkh({
        pubkey,
        network: networkData(network),
      })
      return bc1qAddress
    }
    case Purpose.P2TR: {
      // Context: https://bitcoinops.org/en/topics/x-only-public-keys/
      const xOnlyPubkey = toXOnly(pubkey)
      const { address: bc1pAddress } = bitcoin.payments.p2tr({
        internalPubkey:  xOnlyPubkey,
        network: networkData(network),
      })
      return bc1pAddress
    }
    default:
      return undefined
  }
}
/**
 * Derive a single address from a given extended public key. Address type is
 * defined by the `purpose` parameter.
 *
 * @param  {string} extPubKey - the extended public key
 * @param  {number} [change=0] - change (0 = external chain, 1 = internal chain / change)
 * @param  {number} [keyIndex=0] - the unhardened key index
 * @param  {module:purpose~Purpose} [purpose=DEFAULT_PURPOSE] - the derivation purpose
 * @param  {NETWORK} [network=DEFAULT_NETWORK] - the target network (TESTNET or MAINNET)
 *
 * @returns {object|undefined} derived address
 */
function addressFromExtPubKey({
  extPubKey,
  change = 0,
  keyIndex = 0,
  purpose = DEFAULT_PURPOSE,
  network = DEFAULT_NETWORK,
}) {
  if (
    !isValidChainIndex(change) ||
    !isValidIndex(keyIndex) ||
    !isValidPurpose(purpose) ||
    !isValidExtPubKey(extPubKey, network)
  ) {
    return undefined
  }
  const partialPath = partialKeyDerivationPath({ change, keyIndex })
  const convertedExtPubKey = convertToXPUB(extPubKey, network)
  const fullPath = fullDerivationPath({
    convertedExtPubKey,
    purpose,
    change,
    keyIndex,
    network,
  })
  const childPubKey = deriveChildPublicKey(
    convertedExtPubKey,
    partialPath,
    network
  )
  const pubkey = Buffer.from(childPubKey, "hex")

  return {
    path: fullPath,
    address: deriveAddress({ purpose, pubkey, network }),
  }
}

/**
 * Derive multiple addresses from a given extended public key.
 * See {@link module:derivation~addressFromExtPubKey}.
 *
 * @param  {string} extPubKey - the extended public key
 * @param  {string} addressCount - number of key indices to derive
 * @param  {number} [addressStartIndex=0] - start key index to derive from
 * @param  {number} [change=0] - change (0 = external chain, 1 = internal chain / change)
 * @param  {module:purpose~Purpose} [purpose=DEFAULT_PURPOSE] - the derivation purpose
 * @param  {NETWORK} [network=DEFAULT_NETWORK] - the target network (TESTNET or MAINNET)
 *
 * @returns {object[]} array of derived addresses
 */
function addressesFromExtPubKey({
  extPubKey,
  addressCount,
  addressStartIndex = 0,
  change = 0,
  purpose = DEFAULT_PURPOSE,
  network = DEFAULT_NETWORK,
}) {
  const addresses = []

  for (
    let keyIndex = addressStartIndex;
    keyIndex < addressStartIndex + addressCount;
    keyIndex += 1
  ) {
    const { path, address } = addressFromExtPubKey({
      extPubKey,
      change,
      keyIndex,
      purpose,
      network,
    })

    addresses.push({ path, address })
  }

  return addresses
}

export { addressFromExtPubKey, addressesFromExtPubKey }
