import React from "react"
import {
  deriveChildPublicKey,
  // deriveChildExtendedPublicKey,
  networkData,
} from "unchained-bitcoin"
import * as bitcoin from "bitcoinjs-lib"

// "m/45'/0'/0'": {
// pub: "0387cb4929c287665fbda011b1afbebb0e691a5ee11ee9a561fcd6adba266afe03",
const xpub =
  "xpub6CCHViYn5VzKSmKD9cK9LBDPz9wBLV7owXJcNDioETNvhqhVtj3ABnVUERN9aV1RGTX9YpyPHnC4Ekzjnr7TZthsJRBiXA4QCeXNHEwxLab"
// const xpub =
// "xpub6CCHViYn5VzKFqrKjAzSSqP8XXSU5fEC6ZYSncX5pvSKoRLrPDcF8cEaZkrQvvnuwRUXeKVjoGmAqvbwVkNBFLaRiqcdVhWPyuShUrbcZsv"
const childPubKey = deriveChildPublicKey(xpub, "m/0/0", "mainnet")
// childPubKey: "03102f0df5e34ffa1178a5310952221b8e26b3e761a9e328832c750a2de252f21a"
// const childPubKey =
//   "03102f0df5e34ffa1178a5310952221b8e26b3e761a9e328832c750a2de252f21a"

const MAINNET = networkData("mainnet")

const keyPair = bitcoin.ECPair.fromPublicKey(Buffer.from(childPubKey, "hex"))
const { address: oneAddress } = bitcoin.payments.p2pkh({
  pubkey: keyPair.publicKey,
  network: MAINNET,
})
const { address: threeAddress } = bitcoin.payments.p2sh({
  redeem: bitcoin.payments.p2wpkh({
    pubkey: keyPair.publicKey,
    network: MAINNET,
  }),
})
const { address: bc1Address } = bitcoin.payments.p2wpkh({
  pubkey: keyPair.publicKey,
  network: MAINNET,
})

export default function Home() {
  return (
    <div>
      <p>xpub:</p>
      <code>{xpub}</code>
      <p>Derived childPubKey:</p>
      <code>{childPubKey}</code>
      <p>bitcoinjs-lib keyPair representation:</p>
      <code>{keyPair.publicKey}</code>
      <p>P2PKH address derived from childPubKey:</p>
      <code>{oneAddress}</code>
      <p>P2WPKH-P2SH address derived from childPubKey:</p>
      <code>{threeAddress}</code>
      <p>P2WPKH address derived from childPubKey:</p>
      <code>{bc1Address}</code>
    </div>
  )
}
