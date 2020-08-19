import { deriveChildPublicKey, networkData } from "unchained-bitcoin"
import * as bitcoin from "bitcoinjs-lib"

class ThreeAddress {
  constructor(network) {
    this.network = network
  }

  fromXpub(xpub, accountNumber, keyIndex) {
    const childPubKey = deriveChildPublicKey(
      xpub,
      bip32Path(accountNumber, keyIndex),
      this.network
    )
    const keyPair = bitcoin.ECPair.fromPublicKey(
      Buffer.from(childPubKey, "hex")
    )
    const { address: threeAddress } = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({
        pubkey: keyPair.publicKey,
        network: networkData(this.network),
      }),
    })
    return {
      path: bip32Path(accountNumber, keyIndex),
      address: threeAddress,
      fullPath: bip32PathFull(this.network, accountNumber, keyIndex),
    }
  }
}

function bip32Path(accountNumber, keyIndex) {
  return accountNumber + "/" + keyIndex
}
function bip32PathFull(network, accountNumber, keyIndex) {
  const net = network === "mainnet" ? 0 : 1
  const change = 0
  return [
    "m",
    hardened("44"),
    hardened(net),
    hardened(accountNumber),
    change,
    keyIndex,
  ].join("/")
}

function hardened(string) {
  return string + "'"
}

export default ThreeAddress
