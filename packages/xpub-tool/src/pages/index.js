import React, { useState, useMemo } from "react"
import { Row, Col, Container, Form } from "react-bootstrap"

import {
  NETWORKS,
  Purpose,
  addressesFromExtPubKey,
  isValidExtPubKey,
} from "@swan-bitcoin/xpub-lib"

import {
  DerivedAddressesTable,
  AddressDerivationInput,
  ExtPubKeyInput,
  NetworkSwitcher,
  ExtPubKeyExamples,
  ExtPubKeyMetadata,
} from "@swan-bitcoin/xpub-components-bootstrap"

import Layout from "../components/layout"

const DEFAULT_NETWORK = NETWORKS.MAINNET // or TESTNET
const NUMBER_OF_ADDRESSES = 100 // however many we need

const IndexPage = () => {
  const [network, setNetwork] = useState(DEFAULT_NETWORK)
  const [extPubKey, setExtPubKey] = useState("")
  const [isExpertMode, setExpertMode] = useState(false)
  const [purpose, setPurpose] = useState(Purpose.P2WPKH) // default to bech32
  const [accountNumber, setAccountNumber] = useState(0)

  const handleNetworkChange = event => setNetwork(event.target.value)
  const handleExtPubKeyChange = event => setExtPubKey(event.target.value)
  const handlePurposeChange = event => setPurpose(event.target.value)
  const handleAccountNumberChange = event =>
    setAccountNumber(event.target.value)
  const handleExpertModeChange = event => setExpertMode(event.target.checked)

  const isValid = useMemo(() => isValidExtPubKey(extPubKey, network), [
    extPubKey,
    network,
  ])

  const addressList = isValid
    ? addressesFromExtPubKey({
        extPubKey,
        addressCount: NUMBER_OF_ADDRESSES,
        accountNumber,
        purpose,
        network,
      })
    : []

  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <Container className="text-center">
        <Row>
          <Col>
            <ExtPubKeyInput
              extPubKey={extPubKey}
              network={network}
              onChange={handleExtPubKeyChange}
            />
          </Col>
        </Row>
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
              <hr />
            </Col>
          </Row>
        )}
        {isValid && (
          <Row>
            <Col>
              <DerivedAddressesTable
                network={network}
                extPubKey={extPubKey}
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
              <ExtPubKeyExamples network={network} />
            </Col>
          </Row>
        )}
        {isExpertMode && isValid && (
          <Row>
            <Col>
              <ExtPubKeyMetadata extPubKey={extPubKey} />
            </Col>
          </Row>
        )}
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
