import React, { useState, useMemo } from "react"
import { Row, Col, Container } from "react-bootstrap"
import { MAINNET, validateExtendedPublicKey } from "unchained-bitcoin"

import { Purpose } from "../lib/xpub.js"

import Layout from "../components/layout"
import DerivedAddressesTable from "../components/derivedAddressesTable.js"
import AddressDerivationInput from "../components/addressDerivationInput.js"
import XPubInput from "../components/xpubInput.js"
import NetworkSwitcher from "../components/networkSwitcher"
import { XPubExamples } from "../components/xpubExamples"

const DEFAULT_NETWORK = MAINNET // or TESTNET

const IndexPage = props => {
  const [network, setNetwork] = useState(DEFAULT_NETWORK)
  const [xpub, setXpub] = useState("")
  const [purpose, setPurpose] = useState(Purpose.P2SH) // default to 3addresses
  const [accountNumber, setAccountNumber] = useState(0)
  const [addressCount, setAddressCount] = useState(3)

  const handleNetworkChange = event => setNetwork(event.target.value)
  const handleXpubChange = event => setXpub(event.target.value)
  const handlePurposeChange = event => setPurpose(event.target.value)
  const handleAccountNumberChange = event =>
    setAccountNumber(event.target.value)

  const isValidXpub = useMemo(
    () => validateExtendedPublicKey(xpub, network) === "",
    [xpub, network]
  )

  return (
    <Layout pageInfo={{ pageName: "xpub" }}>
      <Container className="text-center">
        <Row>
          <Col>
            {props.useCustomPath && (
              <AddressDerivationInput
                xpub={xpub}
                purpose={purpose}
                accountNumber={accountNumber}
                addressCount={addressCount}
                xpubHandler={handleXpubChange}
                purposeHandler={handlePurposeChange}
                accountNumberHandler={handleAccountNumberChange}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <XPubInput
              xpub={xpub}
              network={network}
              changeHandler={handleXpubChange}
            />
          </Col>
        </Row>
        {isValidXpub && (
          <Row>
            <Col>
              <DerivedAddressesTable
                network={network}
                xpub={xpub}
                purpose={purpose}
                addressCount={addressCount}
                accountNumber={accountNumber}
              />
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <XPubExamples network={network} />
          </Col>
        </Row>
        <Row>
          <Col>
            <NetworkSwitcher
              network={network}
              changeHandler={handleNetworkChange}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
