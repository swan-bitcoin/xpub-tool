#!/usr/bin/env node

import {
  NETWORKS,
  isValidAddress,
  isValidExtPubKey,
  addressFromExtPubKey,
  addressesFromExtPubKey,
  Purpose,
} from "@swan-bitcoin/xpub-lib"

const { program } = require("commander")
program.version("0.0.1")

program
  .command("derive [extPubKey]")
  .description("derive address(es) from an extended public key")
  .option(
    "-p, --purpose <purpose>",
    "derivation purpose which dictates the address type ['p2pkh', 'p2sh', 'p2wpkh']",
    "p2wpkh"
  ) // use `choices` once this feature is released: https://github.com/tj/commander.js/issues/518
  .option(
    "-n, --addressCount <addressCount>",
    "number of addresses to generate",
    1
  )
  .option(
    "-i, --keyIndex <keyIndex>",
    "index of the key to generate (ignored if `addressCount` is set)",
    0
  )
  .option("-t, --testnet", "use TESTNET")
  .option("-v, --verbose", "verbose output")
  .action((extPubKey, cmdObj) => {
    let network = cmdObj.testnet ? NETWORKS.TESTNET : NETWORKS.MAINNET
    const purpose = cmdObj.purpose
      ? parsePurpose(cmdObj.purpose)
      : Purpose.P2WPKH // default to P2WPKH
    const keyIndex = cmdObj.keyIndex ? cmdObj.keyIndex : 0 // default to P2WPKH

    if (cmdObj.addressCount > 1) {
      // Multiple addresses
      const addressCount = cmdObj.addressCount
      const addresses = addressesFromExtPubKey({
        extPubKey,
        addressCount,
        network,
        purpose,
      })
      console.log(addresses)
    } else {
      // Single address
      const address = addressFromExtPubKey({
        extPubKey,
        keyIndex,
        network,
        purpose,
      })
      cmdObj.verbose ? console.log(address) : {}
      console.log(address.address)
    }
  })

program
  .command("validate [encoded]")
  .description(
    "check an encoded bitcoin address or extended public key for validity"
  )
  .option("-a, --check-address", "check bitcoin address for validity")
  .option("-x, --check-ext", "check extended public key for validity")
  .option("-t, --testnet", "use TESTNET")
  .action((encoded, cmdObj) => {
    let network = program.testnet ? NETWORKS.TESTNET : NETWORKS.MAINNET
    if (cmdObj.checkAddress) {
      const isValid = isValidAddress(encoded, network)
      console.log(isValid)
      return
    }
    if (cmdObj.checkExt) {
      const isValid = isValidExtPubKey(encoded, network)
      console.log(isValid)
      return
    }

    const isValid =
      isValidExtPubKey(encoded, network) || isValidAddress(encoded, network)
    console.log(isValid)
  })

program.parse(process.argv)

function parsePurpose(purpose) {
  switch (purpose.toLowerCase()) {
    case "p2pkh": {
      return Purpose.P2PKH
    }
    case "p2sh": {
      return Purpose.P2SH
    }
    case "p2wpkh": {
      return Purpose.P2WPKH
    }
  }
}
