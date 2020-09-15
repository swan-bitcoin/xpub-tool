import * as bitcoin from "bitcoinjs-lib"
import { deriveChildPublicKey, networkData, NETWORKS } from "unchained-bitcoin"
import { fullDerivationPath, partialKeyDerivationPath } from "./paths"
import { isValidExtPubKey, isValidIndex, isValidPurpose } from "./validation"
import { convertToBIP32 } from "./conversion"
import { Purpose } from "./purpose"

const DEFAULT_NETWORK = NETWORKS.TESTNET
const DEFAULT_PURPOSE = Purpose.P2WPKH

/**
 * Derive a single address from a public key.
 *
 * @param  {Purpose} purpose Purpose dictates the derived address type (P2PKH = 1address, P2SH = 3address, P2WPKH = bc1address).
 * @param  {ECPair.publicKey} pubkey The public key to derive from
 * @param  {NETWORKS} network The network to use (MAINNET or TESTNET)
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

function addressFromExtPubKey({
  extPubKey,
  accountNumber = 0,
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
    keyIndex,
    network,
  })
  const convertedExtPubKey = convertToBIP32(extPubKey, network)
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

function addressesFromExtPubKey({
  extPubKey,
  addressCount,
  accountNumber = 0,
  purpose = DEFAULT_PURPOSE,
  network = DEFAULT_NETWORK,
}) {
  const addresses = []

  for (let keyIndex = 0; keyIndex < addressCount; keyIndex += 1) {
    const { path, address } = addressFromExtPubKey({
      extPubKey,
      accountNumber,
      keyIndex,
      purpose,
      network,
    })

    addresses.push({ path, address })
  }

  return addresses
}

export { addressFromExtPubKey, addressesFromExtPubKey }
