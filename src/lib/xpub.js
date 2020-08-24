import {
  deriveChildPublicKey,
  networkData,
  MAINNET,
  TESTNET,
} from "unchained-bitcoin"
import * as bitcoin from "bitcoinjs-lib"

import { bip32AccountPath, bip32PartialPath } from "../lib/bip32path.js"

const AddressType = {
  P2PKH: 1,
  P2SH: 3,
  P2WPKH: "bc1",
}

class DerivedAddress {
  constructor(network = MAINNET) {
    this.network = network
  }

  // AddressType defaults to P2SH `3addresses` until we support P2WPKH
  fromXpub(
    xpub,
    accountNumber,
    keyIndex,
    type = AddressType.P2SH,
    network = TESTNET
  ) {
    const partialPath = bip32PartialPath(accountNumber, keyIndex)
    const childPubKey = deriveChildPublicKey(xpub, partialPath, this.network)
    const keyPair = bitcoin.ECPair.fromPublicKey(
      Buffer.from(childPubKey, "hex")
    )
    return {
      path: partialPath,
      address: this.deriveAddress(type, keyPair.publicKey),
      fullPath: bip32AccountPath(this.network, accountNumber, keyIndex),
    }
  }

  deriveAddress(type, pubkey) {
    let net = networkData(this.network)
    switch (type) {
      case AddressType.P2PKH: {
        const { address: oneAddress } = bitcoin.payments.p2pkh({
          pubkey: pubkey,
          network: net,
        })
        return oneAddress
      }
      default:
      case AddressType.P2SH: {
        const { address: threeAddress } = bitcoin.payments.p2sh({
          redeem: bitcoin.payments.p2wpkh({
            pubkey: pubkey,
            network: net,
          }),
        })
        return threeAddress
      }
      case AddressType.P2WPKH: {
        const { address: bc1Address } = bitcoin.payments.p2wpkh({
          pubkey: pubkey,
          network: net,
        })
        return bc1Address
      }
    }
  }
}

export { DerivedAddress, AddressType }
