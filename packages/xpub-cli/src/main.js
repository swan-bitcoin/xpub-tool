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
  .option("-a, --check-address <address>", "check bitcoin address for validity")
  .option("-x, --check-xpub <xpub>", "check extended public key for validity")
  .option(
    "-d, --derive <xpub>",
    "derive address(es) from an extended public key"
  )
  .option(
    "-p, --purpose <purpose>",
    "derivation purpose which dictates the address type ['p2pkh', 'p2sh', 'p2wpkh']"
  )
  .option("-t, --testnet", "use TESTNET")
  .option("-v, --verbose", "verbose output")

program.parse(process.argv)

let network = NETWORKS.MAINNET // default to mainnet
if (program.testnet) {
  network = NETWORKS.TESTNET
}

if (program.checkAddress) {
  const address = program.checkAddress
  const isValid = isValidAddress(address, network)
  console.log(isValid)
}
if (program.checkXpub) {
  const xpub = program.checkXpub
  const isValid = isValidExtPubKey(xpub, network)
  console.log(isValid)
}
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
