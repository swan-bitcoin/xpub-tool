import React, { useState, useMemo } from "react"
import { Form, Tabs, Tab, Row, Col, Container } from "react-bootstrap"
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

function harden(string) {
  return string + "'"
}

const HWW = props => {
  const [accountNumber, setAccountNumber] = useState(0)
  let bip32Paths = bipPrefixes.map(purpose => {
    return [
      coinPrefix,
      harden(purpose),
      networkPrefix,
      harden(accountNumber),
    ].join(separator)
  })

  const handleAccountNumberChange = event =>
    setAccountNumber(event.target.value)

  let accountList = []
  for (var i = 0; i < 25; i++) {
    accountList.push(<option key={i}>{i}</option>)
  }

  return (
    <Layout pageInfo={{ pageName: "hww" }}>
      <Container>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Account Nr.
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                size="sm"
                value={accountNumber}
                onChange={handleAccountNumberChange}
              >
                {accountList}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
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
      </Container>
    </Layout>
  )
}

export default HWW
