import React from "react"
import { Form, Row, Col, Container } from "react-bootstrap"
import {
  MAINNET,
  // TESTNET,
} from "unchained-bitcoin"
import { LEDGER, TREZOR } from "unchained-wallets"

import Layout from "../components/layout"
import HardwareWalletExtendedPublicKeyImporter from "../components/hwXPubImporter.js"

const network = MAINNET // or TESTNET
const coinPrefix = "m"
const networkPrefix = network === MAINNET ? harden(0) : harden(1)
const separator = "/"

// From unchained-wallets/trezor.js
//  * const interaction = new TrezorExportExtendedPublicKey({network: MAINNET, bip32Path: "m/48'/0'/0'"});

function bip32Permutations(
  depth = 2,
  bipPrefixes = [44, 49, 84],
  isHardened = true
) {
  let permutations = []
  for (const bipPrefix of bipPrefixes) {
    let path = [
      coinPrefix,
      networkPrefix,
      isHardened ? harden(bipPrefix) : bipPrefix,
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
    <Container className="text-center">
      <Row>
        <Col>
          <Form>
            {[LEDGER, TREZOR].map(type => (
              <Form.Check type="radio" name="keystore" id={type} label={type} />
            ))}
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {bip32Permutations().map(path => (
            <HardwareWalletExtendedPublicKeyImporter
              key={path}
              network={network}
              bip32Path={path}
              keystore={TREZOR}
            />
          ))}
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default HWW
