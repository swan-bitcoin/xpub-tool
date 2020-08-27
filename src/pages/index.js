import React, { useState, useMemo } from "react"
import { Row, Col, Container, Form } from "react-bootstrap"
import { MAINNET, validateExtendedPublicKey } from "unchained-bitcoin"

import { Purpose, addressesFromXPub } from "../lib/xpub"

import Layout from "../components/layout"
import DerivedAddressesTable from "../components/derivedAddressesTable"
import AddressDerivationInput from "../components/addressDerivationInput"
import XPubInput from "../components/xpubInput"
import NetworkSwitcher from "../components/networkSwitcher"
import { XPubExamples } from "../components/xpubExamples"

const DEFAULT_NETWORK = MAINNET // or TESTNET
const NUMBER_OF_ADDRESSES = 100 // however many we need

const IndexPage = props => {
  const [network, setNetwork] = useState(DEFAULT_NETWORK)
  const [xpub, setXpub] = useState("")
  const [isExpertMode, setExpertMode] = useState(false)
  const [purpose, setPurpose] = useState(Purpose.P2SH) // default to 3addresses
  const [accountNumber, setAccountNumber] = useState(0)

  const handleNetworkChange = event => setNetwork(event.target.value)
  const handleXpubChange = event => setXpub(event.target.value)
  const handlePurposeChange = event => setPurpose(event.target.value)
  const handleAccountNumberChange = event =>
    setAccountNumber(event.target.value)
  const handleExpertModeChange = event => setExpertMode(event.target.checked)

  const isValidXpub = useMemo(
    () => validateExtendedPublicKey(xpub, network) === "",
    [xpub, network]
  )

  let addressList = !isValidXpub
    ? []
    : addressesFromXPub({
        xpub,
        addressCount: NUMBER_OF_ADDRESSES,
        accountNumber,
        purpose,
        network,
      })

  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <Container className="text-center">
        <Row>
          <Col>
            <XPubInput
              xpub={xpub}
              network={network}
              changeHandler={handleXpubChange}
            />
          </Col>
        </Row>
        {isExpertMode && (
          <Row>
            <Col>
              <AddressDerivationInput
                xpub={xpub}
                purpose={purpose}
                accountNumber={accountNumber}
                xpubHandler={handleXpubChange}
                onPurposeChange={handlePurposeChange}
                onAccountNumberChange={handleAccountNumberChange}
              />
              <hr />
            </Col>
          </Row>
        )}
        {isValidXpub && (
          <Row>
            <Col>
              <DerivedAddressesTable
                network={network}
                xpub={xpub}
                addressList={addressList}
                showCount="5"
              />
            </Col>
          </Row>
        )}
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
              <XPubExamples network={network} />
            </Col>
          </Row>
        )}
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
