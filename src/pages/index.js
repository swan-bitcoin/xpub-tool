import React from "react"
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
} from "unchained-bitcoin"

import Layout from "../components/layout"
import { DerivedAddress, AddressType } from "../lib/xpub.js"

const network = MAINNET // or TESTNET
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
          <XPubExamples network={network} />
        </Col>
      </Row>
      <Row>
        <Col>
          <XPubTool network={network} />
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

export default IndexPage

class XPubExamples extends React.Component {
  render() {
    var pubs = this.props.network === MAINNET ? EXAMPLE_XPUBS : EXAMPLE_TPUBS

    return (
      <div>
        <p>
          The following are some random example xpubs for easy testing (
          {networkLabel(this.props.network)}):
        </p>
        <ul>
          {pubs.map((pub, i) => (
            <li>
              <code>{pub}</code>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

class DerivedAddressesTable extends React.Component {
  render() {
    let derivedAddress = new DerivedAddress(this.props.network)
    var addressList = []
    for (var i = 0; i < this.props.addressCount; i++) {
      let { path, address, fullPath } = derivedAddress.fromXpub(
        this.props.xpub,
        this.props.accountNumber,
        i,
        AddressType.P2SH // P2SH = 3address = default
      )
      addressList.push(
        <PathAddressRow path={path} address={address} fullPath={fullPath} />
      )
    }

    return (
      <Table bordered variant="dark">
        <tr>
          <th>Path</th>
          <th>Address</th>
        </tr>
        {addressList}
      </Table>
    )
  }
}

class PathAddressRow extends React.Component {
  render() {
    return (
      <tr>
        <td>
          <span title={this.props.fullPath}>{this.props.path}</span>
        </td>
        <td>{this.props.address}</td>
      </tr>
    )
  }
}

class XPubTool extends React.Component {
  constructor(props) {
    super(props)
    let pub =
      this.props.network === MAINNET ? EXAMPLE_XPUBS[0] : EXAMPLE_TPUBS[0]
    this.state = {
      xpub: pub,
      accountNumber: 0,
      addressCount: 5,
    }
    this.handleXpubChange = this.handleXpubChange.bind(this)
    this.handleAccountNumberChange = this.handleAccountNumberChange.bind(this)
    this.handleAddressCountChange = this.handleAddressCountChange.bind(this)
  }

  isValidXpub(xpub) {
    try {
      new DerivedAddress(this.props.network).fromXpub(xpub, 0, 0)
    } catch (err) {
      return false
    }

    return true
  }

  handleXpubChange(event) {
    this.setState({
      xpub: event.target.value,
    })
  }
  handleAccountNumberChange(event) {
    this.setState({
      accountNumber: event.target.value,
    })
  }
  handleAddressCountChange(event) {
    this.setState({
      addressCount: event.target.value,
    })
  }
  displayBip32Path() {
    return "m / 44 / " + this.state.accountNumber + " / i"
  }

  render() {
    var accountList = []
    for (var i = 0; i < MAX_ACCOUNTS; i++) {
      accountList.push(<option>{i}</option>)
    }

    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Control
              size="lg"
              type="text"
              placeholder="xpub..."
              value={this.state.xpub}
              onChange={this.handleXpubChange}
            />
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Account Nr.
            </Form.Label>
            <Col sm="10">
              <Form.Control
                as="select"
                size="sm"
                value={this.state.accountNumber}
                onChange={this.handleAccountNumberChange}
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
                value={this.state.addressCount}
                onChange={this.handleAddressCountChange}
              />
            </Col>
          </Form.Group>
        </Form>
        {this.isValidXpub(this.state.xpub) ? (
          <DerivedAddressesTable
            network={this.props.network}
            xpub={this.state.xpub}
            addressCount={this.state.addressCount}
            accountNumber={this.state.accountNumber}
          />
        ) : (
          <Alert variant="warning">Invalid xPub</Alert>
        )}
      </div>
    )
  }
}
