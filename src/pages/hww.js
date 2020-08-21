import React from "react"
import { Tabs, Tab, Row, Col, Container } from "react-bootstrap"
import {
  MAINNET,
  // TESTNET,
} from "unchained-bitcoin"
import { LEDGER, TREZOR } from "unchained-wallets"

import Layout from "../components/layout"
import HardwareWalletExtendedPublicKeyImporter from "../components/hwXPubImporter.js"

// BIP32 Path Derivation
const network = MAINNET // or TESTNET
const coinPrefix = "m"
const networkPrefix = network === MAINNET ? harden(0) : harden(1)
const separator = "/"

// From unchained-wallets/trezor.js
//  * const interaction = new TrezorExportExtendedPublicKey({network: MAINNET, bip32Path: "m/48'/0'/0'"});

// m / purpose' / coin_type' / account' / change / address_index
// Example: "m/44'/0'/0'"
const bipPrefixes = [44, 49, 84]
const acounts = [0, 1, 2, 3]
const bip32Paths = bipPrefixes.map(purpose => {
  return [coinPrefix, harden(purpose), networkPrefix, harden(0)].join(separator)
})

function bip32Permutations(
  depth = 2,
  bipPrefixes = [44, 49, 84],
  isHardened = true
) {
  let permutations = []
  for (const purpose of bipPrefixes) {
    let path = [
      coinPrefix,
      isHardened ? harden(purpose) : purpose,
      networkPrefix,
    ]
    for (let i = 0; i < depth; i++) {
      path.push(isHardened ? harden(0) : 0)
      permutations.push(path.join(separator))
    }
  }
  return permutations
}

function harden(string) {
  return string + "'"
}

const HWW = () => (
  <Layout pageInfo={{ pageName: "hww" }}>
    <Tabs id="hardware-wallet-selector">
      {[LEDGER, TREZOR].map(type => (
        <Tab eventKey={type} title={type.toUpperCase()}>
          {bip32Paths.map(path => (
            <HardwareWalletExtendedPublicKeyImporter
              key={path}
              network={network}
              bip32Path={path}
              keystore={type}
            />
          ))}
        </Tab>
      ))}
    </Tabs>
    <Container className="text-center">
      <Row>
        <Col></Col>
      </Row>
    </Container>
  </Layout>
)

export default HWW
