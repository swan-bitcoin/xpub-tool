import React, { useState } from "react"
import { Form, Row, Col, Container } from "react-bootstrap"
import { MAINNET } from "unchained-bitcoin"

import { Purpose } from "../lib/xpub"

import Layout from "../components/layout"
import NetworkSwitcher from "../components/networkSwitcher"
import AddressDerivationInput from "../components/addressDerivationInput"
import HardwareWallets from "../components/hardwareWallets"

const DEFAULT_NETWORK = MAINNET // or TESTNET

const IndexPage = () => {
  const [network, setNetwork] = useState(DEFAULT_NETWORK)
  const [purpose, setPurpose] = useState(Purpose.P2SH) // default to 3addresses
  const [accountNumber, setAccountNumber] = useState(0)
  const [isExpertMode, setExpertMode] = useState(false)

  const handlePurposeChange = event => setPurpose(event.target.value)
  const handleAccountNumberChange = event =>
    setAccountNumber(event.target.value)
  const handleNetworkChange = event => setNetwork(event.target.value)
  const handleExpertModeChange = event => setExpertMode(event.target.checked)

  return (
    <Layout pageInfo={{ pageName: "hww" }}>
      <Container className="text-center">
        {isExpertMode && (
          <Row>
            <Col>
              <AddressDerivationInput
                purpose={purpose}
                accountNumber={accountNumber}
                network={network}
                onPurposeChange={handlePurposeChange}
                onAccountNumberChange={handleAccountNumberChange}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <HardwareWallets
              purpose={purpose}
              accountNumber={accountNumber}
              network={network}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
            <Form.Check
              type="checkbox"
              label="Show developer options"
              onChange={handleExpertModeChange}
            />
            <hr />
          </Col>
        </Row>
        {isExpertMode && (
          <Row>
            <Col>
              <NetworkSwitcher
                network={network}
                onClick={handleNetworkChange}
              />
            </Col>
          </Row>
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
