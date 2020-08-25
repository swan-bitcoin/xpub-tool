import {
  deriveChildPublicKey,
  networkData,
  MAINNET,
  TESTNET,
} from "unchained-bitcoin"
import * as bitcoin from "bitcoinjs-lib"

import { fullDerivationPath, partialKeyDerivationPath } from "../lib/paths.js"

// Purpose defines the address type
const Purpose = {
  P2PKH: 44, // 1...
  P2SH: 49, // 3...
  P2WPKH: 84, // bc1...
}

class DerivedAddress {
  constructor(network = MAINNET) {
    this.network = network
  }

  fromXpub(xpub, accountNumber, keyIndex, purpose, network = TESTNET) {
    const partialPath = partialKeyDerivationPath(accountNumber, keyIndex)
    const childPubKey = deriveChildPublicKey(xpub, partialPath, this.network)
    const keyPair = bitcoin.ECPair.fromPublicKey(
      Buffer.from(childPubKey, "hex")
    )
    return {
      path: partialPath,
      address: this.deriveAddress(purpose, keyPair.publicKey),
      fullPath: fullDerivationPath(
        purpose,
        accountNumber,
        keyIndex,
        this.network
      ),
    }
  }

  deriveAddress(purpose, pubkey) {
    let net = networkData(this.network)
    switch (Number(purpose)) {
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
}

export { DerivedAddress, Purpose }
