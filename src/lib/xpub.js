import * as bitcoin from "bitcoinjs-lib"
import { deriveChildPublicKey, networkData, TESTNET } from "unchained-bitcoin"
import { fullDerivationPath, partialKeyDerivationPath } from "../lib/paths.js"
import Purpose from "./purpose"

const DEFAULT_NETWORK = TESTNET
const DEFAULT_PURPOSE = Purpose.P2SH

function maskXPub(xpub, pre = 15, post = 15, placeholder = "[...]") {
  const beginning = xpub.substr(0, pre)
  const ending = xpub.substr(xpub.length - post, xpub.length)
  return beginning + placeholder + ending
}

function addressesFromXPub(
  xpub,
  addressCount,
  accountNumber = 0,
  purpose = DEFAULT_PURPOSE,
  network = DEFAULT_NETWORK
) {
  let addresses = []

  for (let i = 0; i < addressCount; i++) {
    const { path, address } = addressFromXPub(
      xpub,
      accountNumber,
      i,
      purpose,
      network
    )

    addresses.push({ path, address })
  }

  return addresses
}

function addressFromXPub(xpub, accountNumber, keyIndex, purpose, network) {
  const partialPath = partialKeyDerivationPath(accountNumber, keyIndex)
  const fullPath = fullDerivationPath(purpose, accountNumber, keyIndex, network)
  const childPubKey = deriveChildPublicKey(xpub, partialPath, network)
  const keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(childPubKey, "hex"))
  return {
    path: fullPath,
    address: deriveAddress(purpose, keyPair.publicKey, network),
  }
}

function deriveAddress(purpose, pubkey, network) {
  let net = networkData(network)
  switch (purpose) {
    case Purpose.P2PKH: {
      const { address: oneAddress } = bitcoin.payments.p2pkh({
        pubkey: pubkey,
        network: net,
      })
      return oneAddress
    }
    default:
    case Purpose.P2SH: {
      const { address: threeAddress } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({
          pubkey: pubkey,
          network: net,
        }),
      })
      return threeAddress
    }
    case Purpose.P2WPKH: {
      const { address: bc1Address } = bitcoin.payments.p2wpkh({
        pubkey: pubkey,
        network: net,
      })
      return bc1Address
    }
  }
}

export { Purpose, maskXPub, addressesFromXPub }
