#!/usr/bin/env node

import {
  NETWORKS,
  isValidAddress,
  isValidExtPubKey,
} from "@swan-bitcoin/xpub-lib"

const { program } = require("commander")
program.version("0.0.1")

program
  .option("-a, --check-address <address>", "check bitcoin address for validity")
  .option("-x, --check-xpub <xpub>", "check extended public key for validity")
  .option("-t, --testnet", "use TESTNET")

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
