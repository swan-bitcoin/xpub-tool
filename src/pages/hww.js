import React, { useState, useMemo } from "react"
import {
  Alert,
  Row,
  Col,
  Container,
  ListGroup,
  Table,
  Form,
} from "react-bootstrap"
import {
  MAINNET,
  // TESTNET,
  networkLabel,
  validateExtendedPublicKey,
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
