#!/usr/bin/env node

import {
  NETWORKS,
  isValidAddress,
  isValidExtPubKey,
  addressFromExtPubKey,
  Purpose,
} from "@swan-bitcoin/xpub-lib"

const { program } = require("commander")
program.version("0.0.1")

program
  .command("derive <xpub>", "derive address(es) from an extended public key")
  .option(
    "-p, --purpose <purpose>",
    "derivation purpose which dictates the address type ['p2pkh', 'p2sh', 'p2wpkh']"
  ) // use `choices` once this feature is released: https://github.com/tj/commander.js/issues/518
  .option("-t, --testnet", "use TESTNET")
  .option("-v, --verbose", "verbose output")

program
  .command("validate [encoded]")
  .description(
    "check an encoded bitcoin address or extended public key for validity"
  )
  .option("-a, --check-address", "check bitcoin address for validity")
  .option("-x, --check-xpub", "check extended public key for validity")
  .action((encoded, cmdObj) => {
    let network = program.testnet ? NETWORKS.TESTNET : NETWORKS.MAINNET
    if (cmdObj.checkAddress) {
      const isValid = isValidAddress(encoded, network)
      console.log(isValid)
      return
    }
    if (cmdObj.checkXpub) {
      console.log("XPUB")
      const isValid = isValidExtPubKey(encoded, network)
      console.log(isValid)
      return
    }

    const isValid =
      isValidExtPubKey(encoded, network) || isValidAddress(encoded, network)
    console.log(isValid)
  })

program.parse(process.argv)

if (program.derive) {
  const extPubKey = program.derive
  console.log(program.purpose)
  const purpose = program.purpose
    ? parsePurpose(program.purpose)
    : Purpose.P2WPKH // default to P2WPKH
  const address = addressFromExtPubKey({ extPubKey, network, purpose })

  if (program.verbose) {
    console.log(address)
  } else {
    console.log(address.address)
  }
}

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
