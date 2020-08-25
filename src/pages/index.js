import React, { useState } from "react"
import {
  Button,
  ButtonGroup,
  Row,
  Col,
  Container,
  ListGroup,
} from "react-bootstrap"
import { MAINNET, TESTNET } from "unchained-bitcoin"

import Layout from "../components/layout"
import { XPubExamples } from "../components/xpubExamples"
import XPubTool from "../components/xpubTool"

const DEFAULT_NETWORK = MAINNET // or TESTNET

const IndexPage = props => {
  const networks = [MAINNET, TESTNET]
  const [network, setNetwork] = useState(DEFAULT_NETWORK)

  const handleNetworkChange = event => setNetwork(event.target.value)

  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <Container className="text-center">
        <Row>
          <Col>
            <ButtonGroup size="lg" className="mb-2">
              {networks.map(net => {
                return (
                  <Button
                    key={net}
                    value={net}
                    variant={net === network ? "primary" : "outline-primary"}
                    onClick={handleNetworkChange}
                  >
                    {net}
                  </Button>
                )
              })}
            </ButtonGroup>
          </Col>
        </Row>
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
}

export default IndexPage
