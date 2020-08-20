import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import {
  MAINNET,
  // TESTNET,
} from "unchained-bitcoin"
import { LEDGER } from "unchained-wallets"

import Layout from "../components/layout"
import HardwareWalletExtendedPublicKeyImporter from "../components/hwXPubImporter.js"

const network = MAINNET // or TESTNET

function bip32Permutations(
  depth,
  bipPrefixes = [44, 49, 84],
  isHardened = true
) {
  let permutations = []
  for (const bip of bipPrefixes) {
    let path = isHardened ? harden(bip) : bip
    for (let i = 0; i < depth; i++) {
      path = path + "/" + (isHardened ? harden(0) : 0)
      permutations.push(path)
    }
  }
  return permutations
}

function harden(string) {
  return string + "'"
}

const HWW = () => (
  <Layout pageInfo={{ pageName: "hww" }}>
    <Container className="text-center">
      <Row>
        <Col>
          <code>{bip32Permutations(2)}</code>
        </Col>
      </Row>
      <Row>
        <Col>
          <HardwareWalletExtendedPublicKeyImporter
            network={network}
            bip32Path="44'/0'"
            keystore={LEDGER}
          />
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default HWW
