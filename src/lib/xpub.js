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
      bip32PartialPath(accountNumber, keyIndex),
      this.network
    )
    const keyPair = bitcoin.ECPair.fromPublicKey(
      Buffer.from(childPubKey, "hex")
    )
    return {
      path: [accountNumber, keyIndex].join(separator),
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

function bip32PartialPath(accountNumber, keyIndex) {
  return [accountNumber, keyIndex].join(separator)
}

// m / purpose' / coin_type' / account' / change / address_index
// Example: "m/44'/0'/0'"
const bip32PurposePrefixes = [44, 49, 84]
const separator = "/"

function bip32AccountPath(
  purpose,
  accountNumber,
  network = MAINNET,
  coinPrefix = "m"
) {
  return [
    coinPrefix,
    harden(purpose),
    harden(network === MAINNET ? 0 : 1),
    accountNumber,
  ].join(separator)
}
function harden(string) {
  return string + "'"
}

// "Account" definitions as used by wallets
const AccountType = {
  "44": "Legacy", // 1addresses
  "49": "SegWit", // 3addresses, SegWit = default
  "84": "Native SegWit", // bc1addresses
}

function bip32HumanReadablePath(bip32Path) {
  // m / purpose' / coin_type' / account' / change / address_index
  // Example: "m/44'/0'/0'"
  console.log(bip32Path)
  let pathSegments = bip32Path.split("/")
  console.log(pathSegments)
  let purpose = pathSegments[1].replace("'", "")
  let account = Number(pathSegments[3].replace("'", "")) + 1
  console.log(purpose)
  return AccountType[purpose.toString()] + " Account #" + account
}

export {
  DerivedAddress,
  AddressType,
  bip32AccountPath,
  bip32PartialPath,
  bip32HumanReadablePath,
  bip32PurposePrefixes,
}
