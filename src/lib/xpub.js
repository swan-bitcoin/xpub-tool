import { deriveChildPublicKey, networkData } from "unchained-bitcoin"
import * as bitcoin from "bitcoinjs-lib"

class AddressDerivation {
  constructor(network) {
    this.network = network
  }

  fromXpub(xpub, accountNumber, keyIndex) {
    var bip32Path = "m/" + accountNumber + "/" + keyIndex
    const childPubKey = deriveChildPublicKey(xpub, bip32Path, this.network)
    const keyPair = bitcoin.ECPair.fromPublicKey(
      Buffer.from(childPubKey, "hex")
    )
    const { address: threeAddress } = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({
        pubkey: keyPair.publicKey,
        network: networkData(this.network),
      }),
    })
    return { path: bip32Path, address: threeAddress }
  }
}

export default AddressDerivation
