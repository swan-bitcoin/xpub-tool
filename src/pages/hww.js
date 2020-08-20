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

const HWW = () => (
  <Layout pageInfo={{ pageName: "hww" }}>
    <Container className="text-center">
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
