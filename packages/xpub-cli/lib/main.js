#!/usr/bin/env node
"use strict";

var _xpubLib = require("@swan-bitcoin/xpub-lib");

var _require = require("commander"),
    program = _require.program;

program.version("0.0.1");
program.option("-a, --check-address <address>", "check bitcoin address for validity").option("-x, --check-xpub <xpub>", "check extended public key for validity").option("-t, --testnet", "use TESTNET");
program.parse(process.argv);
var network = _xpubLib.NETWORKS.MAINNET; // default to mainnet

if (program.testnet) {
  network = _xpubLib.NETWORKS.TESTNET;
}

if (program.checkAddress) {
  var address = program.checkAddress;
  var isValid = (0, _xpubLib.isValidAddress)(address, network);
  console.log(isValid);
}

if (program.checkXpub) {
  var xpub = program.checkXpub;

  var _isValid = (0, _xpubLib.isValidExtPubKey)(xpub, network);

  console.log(_isValid);
}