#!/usr/bin/env node

import { NETWORKS, isValidAddress } from "@swan-bitcoin/xpub-lib"

const { program } = require("commander")
program.version("0.0.1")

program
  .option("-a, --check-address <address>", "check bitcoin address for validity")
  .option("-x, --check-xpub <xpub>", "check extended public key for validity")

program.parse(process.argv)

const network = NETWORKS.MAINNET // default to mainnet

if (program.checkAddress) {
  const address = program.checkAddress
  const isValid = isValidAddress(address, network)
  console.log(isValid)
}
if (program.checkXpub) {
}
