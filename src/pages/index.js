import React from "react"
import { Row, Col, Container, ListGroup, Table, Form } from "react-bootstrap"
import { deriveChildPublicKey, networkData } from "unchained-bitcoin"
import * as bitcoin from "bitcoinjs-lib"

import Layout from "../components/layout"

const IndexPage = () => (
  <Layout pageInfo={{ pageName: "index" }}>
    <Container className="text-center">
      <Row>
        <Col>
          <XPubExamples />
        </Col>
      </Row>
      <Row>
        <Col>
          <XPubInput />
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
    const xpubs = [
      "xpub6CCHViYn5VzKSmKD9cK9LBDPz9wBLV7owXJcNDioETNvhqhVtj3ABnVUERN9aV1RGTX9YpyPHnC4Ekzjnr7TZthsJRBiXA4QCeXNHEwxLab",
      "xpub6D7NqpxWckGwCHhpXoL4pH38m5xVty62KY2wUh6JoyDCofwHciDRoQ3xm7WAg2ffpHaC6X4bEociYq81niyNUGhCxEs6fDFAd1LPbEmzcAm",
      "xpub6BfKpqjTwvH21wJGWEfxLppb8sU7C6FJge2kWb9315oP4ZVqCXG29cdUtkyu7YQhHyfA5nt63nzcNZHYmqXYHDxYo8mm1Xq1dAC7YtodwUR",
    ]

    return (
      <div>
        <p>
          The following are some random example xpubs for easy testing (BTC
          mainnet):
        </p>
        <ul>
          {xpubs.map((xpub, i) => (
            <li>
              <code>{xpub}</code>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

class DerivedAddressesTable extends React.Component {
  render() {
    var addressList = []
    for (var i = 0; i < this.props.addressCount; i++) {
      var bip32Path = "m/" + this.props.accountNumber + "/" + i
      const childPubKey = deriveChildPublicKey(
        this.props.xpub,
        bip32Path,
        "mainnet"
      )
      const MAINNET = networkData("mainnet")
      const keyPair = bitcoin.ECPair.fromPublicKey(
        Buffer.from(childPubKey, "hex")
      )
      const { address: threeAddress } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({
          pubkey: keyPair.publicKey,
          network: MAINNET,
        }),
      })
      addressList.push(
        <PathAddressRow path={bip32Path} address={threeAddress} />
      )
    }

    return (
      <Table bordered>
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
        <td>{this.props.path}</td>
        <td>{this.props.address}</td>
      </tr>
    )
  }
}

class XPubInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xpub:
        "xpub6CCHViYn5VzKSmKD9cK9LBDPz9wBLV7owXJcNDioETNvhqhVtj3ABnVUERN9aV1RGTX9YpyPHnC4Ekzjnr7TZthsJRBiXA4QCeXNHEwxLab",
      accountNumber: 0,
      addressCount: 10,
    }
    this.handleXpubChange = this.handleXpubChange.bind(this)
    this.handleAccountNumberChange = this.handleAccountNumberChange.bind(this)
    this.handleAddressCountChange = this.handleAddressCountChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  handleSubmit(event) {
    alert(
      "State updated: " +
        this.state.xpub +
        " / Account Nr. " +
        this.state.accountNumber +
        " / Addresses: " +
        this.state.addressCount
    )
    event.preventDefault()
  }
  displayBip32Path() {
    return "m / 44 / " + this.state.accountNumber + " / i"
  }

  render() {
    return (
      <div>
        <form>
          <label>
            xPub:
            <input
              type="text"
              name="xpub"
              value={this.state.xpub}
              onChange={this.handleXpubChange}
            />
          </label>
          <label>
            Account Number:
            <input
              type="text"
              name="accountNumber"
              value={this.state.accountNumber}
              onChange={this.handleAccountNumberChange}
            />
          </label>
          <label>
            Addresses to derive:
            <input
              type="text"
              name="addressCount"
              value={this.state.addressCount}
              onChange={this.handleAddressCountChange}
            />
          </label>
          <p>
            <code>{this.displayBip32Path()}</code>
          </p>
          <input type="submit" value="Submit" />
        </form>

        <DerivedAddressesTable
          xpub={this.state.xpub}
          addressCount={this.state.addressCount}
          accountNumber={this.state.accountNumber}
        />
      </div>
    )
  }
}
