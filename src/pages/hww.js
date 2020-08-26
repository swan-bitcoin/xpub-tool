import React, { useState } from "react"
import { Form, Row, Col, Container } from "react-bootstrap"
import { MAINNET } from "unchained-bitcoin"

import { Purpose } from "../lib/xpub.js"

import Layout from "../components/layout"
import NetworkSwitcher from "../components/networkSwitcher"
import AddressDerivationInput from "../components/addressDerivationInput.js"
import HardwareWallets from "../components/hardwareWallets.js"

const DEFAULT_NETWORK = MAINNET // or TESTNET

const IndexPage = props => {
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
                purposeHandler={handlePurposeChange}
                accountNumberHandler={handleAccountNumberChange}
                network={network}
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
                changeHandler={handleNetworkChange}
              />
            </Col>
          </Row>
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
