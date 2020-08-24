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

import Layout from "../components/layout"
import { DerivedAddress, Purpose } from "../lib/xpub.js"
import { bip32AccountPath } from "../lib/bip32path.js"

const NETWORK = MAINNET // or TESTNET
const MAX_ACCOUNTS = 25

// Mainnet: xpub...
// Testnet: tpub...
const EXAMPLE_XPUBS = [
  "xpub6CCHViYn5VzKSmKD9cK9LBDPz9wBLV7owXJcNDioETNvhqhVtj3ABnVUERN9aV1RGTX9YpyPHnC4Ekzjnr7TZthsJRBiXA4QCeXNHEwxLab",
  "xpub6D7NqpxWckGwCHhpXoL4pH38m5xVty62KY2wUh6JoyDCofwHciDRoQ3xm7WAg2ffpHaC6X4bEociYq81niyNUGhCxEs6fDFAd1LPbEmzcAm",
  "xpub6BfKpqjTwvH21wJGWEfxLppb8sU7C6FJge2kWb9315oP4ZVqCXG29cdUtkyu7YQhHyfA5nt63nzcNZHYmqXYHDxYo8mm1Xq1dAC7YtodwUR",
]
const EXAMPLE_TPUBS = [
  "tpubDCZv1xNTnmwmXe3BBMyXekiVreY853jFeC8k9AaEAqCDYi1ZTSTLH3uQonwCTRk9jL1SFu1cLNbDY76YtcDR8n2inSMwBEAdZs37EpYS9px",
]

const IndexPage = () => (
  <Layout pageInfo={{ pageName: "index" }}>
    <Container className="text-center">
      <Row>
        <Col>
          <XPubExamples network={NETWORK} />
        </Col>
      </Row>
      <Row>
        <Col>
          <XPubTool network={NETWORK} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <p>Heavy lifting done by the following libraries:</p>
        </Col>
      </Row>
      <Row className="justify-content-center my-3">
        <Col md="6">
          <ListGroup>
            <ListGroup.Item
              action
              href="https://github.com/unchained-capital/unchained-bitcoin/"
              target="_blank"
            >
              unchained-bitcoin
            </ListGroup.Item>
            <ListGroup.Item
              action
              href="https://github.com/bitcoinjs/bitcoinjs-lib"
              target="_blank"
            >
              bitcoinjs-lib
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  </Layout>
)

const XPubExamples = props => {
  const pubs = props.network === MAINNET ? EXAMPLE_XPUBS : EXAMPLE_TPUBS

  return (
    <div>
      <p>
        The following are some random example xpubs for easy testing (
        {networkLabel(props.network)}):
      </p>
      <ul>
        {pubs.map((pub, i) => (
          <li key={i}>
            <code>{pub}</code>
          </li>
        ))}
      </ul>
    </div>
  )
}

const DerivedAddressesTable = props => {
  const derivedAddress = new DerivedAddress(props.network)
  // generate the addresses and cache them inside the memo.
  const addressList = useMemo(() => {
    let addresses = []

    for (let i = 0; i < props.addressCount; i++) {
      console.log(props.purpose)
      const address = derivedAddress.fromXpub(
        props.xpub,
        props.accountNumber,
        i,
        props.purpose
      )

      addresses.push(address)
    }

    return addresses
  }, [
    props.purpose,
    derivedAddress,
    props.addressCount,
    props.xpub,
    props.accountNumber,
  ])

  return (
    <Table bordered variant="dark">
      <thead>
        <tr>
          <th>Path</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {addressList.map(({ address, path, fullPath }) => (
          <PathAddressRow
            key={address}
            path={path}
            address={address}
            fullPath={fullPath}
          />
        ))}
      </tbody>
    </Table>
  )
}

const PathAddressRow = props => (
  <tr>
    <td>
      <span title={props.fullPath}>{props.path}</span>
    </td>
    <td>{props.address}</td>
  </tr>
)

const XPubTool = props => {
  const exampleXPub =
    props.network === MAINNET ? EXAMPLE_XPUBS[0] : EXAMPLE_TPUBS[0]

  const [xpub, setXpub] = useState(exampleXPub)
  const [purpose, setPurpose] = useState(Purpose.P2PKH)
  const [accountNumber, setAccountNumber] = useState(0)
  const [addressCount, setAddressCount] = useState(5)

  // derived state. gets cached and recomputed by `useMemo` whenever `xpub` or `props.network` change
  const isValidXpub = useMemo(
    () => validateExtendedPublicKey(xpub, props.network) === "",
    [xpub, props.network]
  )

  const handleXpubChange = event => setXpub(event.target.value)
  const handlePurposeChange = event => setPurpose(event.target.value)
  const handleAccountNumberChange = event =>
    setAccountNumber(event.target.value)
  const handleAddressCountChange = event => setAddressCount(event.target.value)

  let accountList = []
  for (var i = 0; i < MAX_ACCOUNTS; i++) {
    accountList.push(<option key={i}>{i}</option>)
  }

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Control
            size="lg"
            type="text"
            placeholder="xpub..."
            value={xpub}
            onChange={handleXpubChange}
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            BIP
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              size="sm"
              name="purpose"
              value={purpose}
              onChange={handlePurposeChange}
            >
              {Object.values(Purpose).map(type => (
                <option key={type}>{type}</option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Account Nr.
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              size="sm"
              name="accountNumber"
              value={accountNumber}
              onChange={handleAccountNumberChange}
            >
              {accountList}
            </Form.Control>
          </Col>
          <Form.Label column sm="2">
            Stacking Time
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="range"
              name="addressCount"
              min="1"
              max="99"
              value={addressCount}
              onChange={handleAddressCountChange}
            />
          </Col>
        </Form.Group>
      </Form>
      <p>
        <code>{bip32AccountPath(purpose, accountNumber)}</code>
      </p>
      {isValidXpub ? (
        <DerivedAddressesTable
          network={props.network}
          xpub={xpub}
          purpose={purpose}
          addressCount={addressCount}
          accountNumber={accountNumber}
        />
      ) : (
        <Alert variant="warning">Invalid xPub</Alert>
      )}
    </div>
  )
}

export default IndexPage
