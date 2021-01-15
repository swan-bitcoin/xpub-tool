/**
 * This module defines functions for address derivation.
 *
 * @module derivation
 */

import * as bitcoin from "bitcoinjs-lib"
import { deriveChildPublicKey, networkData, NETWORKS } from "unchained-bitcoin"
import { fullDerivationPath, partialKeyDerivationPath } from "./paths"
import { isValidExtPubKey, isValidIndex, isValidPurpose } from "./validation"
import { convertToXPUB } from "./conversion"
import { Purpose } from "./purpose"

/**
 * Default network to use for address derivation.
 *
 * @constant
 * @type {string}
 * @default NETWORKS.TESTNET
 * */
const DEFAULT_NETWORK = NETWORKS.TESTNET
/**
 * Default purpose to use for address derivation.
 *
 * @constant
 * @type {string}
 * @default Purpose.P2WPKH
 * */
const DEFAULT_PURPOSE = Purpose.P2WPKH

/**
 * Derive a single address from a public key.
 *
 * @param {module:purpose~Purpose} purpose - the purpose dictates the derived
 * address type (P2PKH = 1address, P2SH = 3address, P2WPKH = bc1address)
 * @param  {object} pubkey - the ECPair.publicKey public key to derive from
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
      const { address: bc1Address } = bitcoin.payments.p2wpkh({
        pubkey,
        network: networkData(network),
      })
      return bc1Address
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
 * @param  {number} accountNumber - the account number, starting with 0
 * @param  {number} [change=0] - change (0 = external chain, 1 = internal chain / change)
 * @param  {number} [keyIndex=0] - the unhardened key index
 * @param  {module:purpose~Purpose} [purpose=DEFAULT_PURPOSE] - the derivation purpose
 * @param  {NETWORK} [network=DEFAULT_NETWORK] - the target network (TESTNET or MAINNET)
 *
 * @returns {object|undefined} derived address
 */
function addressFromExtPubKey({
  extPubKey,
  accountNumber = 0,
  change = 0,
  keyIndex = 0,
  purpose = DEFAULT_PURPOSE,
  network = DEFAULT_NETWORK,
}) {
  if (
    !isValidIndex(accountNumber) ||
    !isValidIndex(keyIndex) ||
    !isValidPurpose(purpose) ||
    !isValidExtPubKey(extPubKey, network)
  ) {
    return undefined
  }
  const partialPath = partialKeyDerivationPath({ accountNumber, keyIndex })
  const fullPath = fullDerivationPath({
    purpose,
    accountNumber,
    change,
    keyIndex,
    network,
  })
  const convertedExtPubKey = convertToXPUB(extPubKey, network)
  const childPubKey = deriveChildPublicKey(
    convertedExtPubKey,
    partialPath,
    network
  )
  const keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(childPubKey, "hex"))
  const pubkey = keyPair.publicKey
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
 * @param  {number} [accountNumber=0] - the account number, starting with 0
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
  accountNumber = 0,
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
      accountNumber,
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
