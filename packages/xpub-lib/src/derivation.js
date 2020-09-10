import * as bitcoin from "bitcoinjs-lib"
import { deriveChildPublicKey, networkData, NETWORKS } from "unchained-bitcoin"
import { fullDerivationPath, partialKeyDerivationPath } from "./paths"
import { isValidXpub, convertToBIP32 } from "./validation"
import Purpose from "./purpose"

const DEFAULT_NETWORK = NETWORKS.TESTNET
const DEFAULT_PURPOSE = Purpose.P2WPKH

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

function addressFromXpub({
  xpub,
  accountNumber = 0,
  keyIndex = 0,
  purpose = DEFAULT_NETWORK,
  network = DEFAULT_NETWORK,
}) {
  if (!isValidXpub(xpub, network)) {
    return undefined
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

export { addressFromXpub, addressesFromXpub }
