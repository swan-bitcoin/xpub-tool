import { deriveChildPublicKey, networkData, MAINNET } from "unchained-bitcoin"
import * as bitcoin from "bitcoinjs-lib"

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
  fromXpub(xpub, accountNumber, keyIndex, type = AddressType.P2SH) {
    const childPubKey = deriveChildPublicKey(
      xpub,
      bip32Path(accountNumber, keyIndex),
      this.network
    )
    const keyPair = bitcoin.ECPair.fromPublicKey(
      Buffer.from(childPubKey, "hex")
    )
    return {
      path: bip32Path(accountNumber, keyIndex),
      address: this.deriveAddress(type, keyPair.publicKey),
      fullPath: bip32PathFull(this.network, accountNumber, keyIndex),
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

function bip32Path(accountNumber, keyIndex) {
  return accountNumber + "/" + keyIndex
}
function bip32PathFull(network, accountNumber, keyIndex) {
  const net = network === MAINNET ? 0 : 1
  const change = 0
  return [
    "m",
    hardened("44"),
    hardened(net),
    accountNumber,
    change,
    keyIndex,
  ].join("/")
}

function hardened(string) {
  return string + "'"
}

export { DerivedAddress, AddressType }
