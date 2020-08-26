import React, { useState } from "react"
import { Row, Col, Container, ListGroup } from "react-bootstrap"
import { MAINNET } from "unchained-bitcoin"

import Layout from "../components/layout"
import { XPubExamples } from "../components/xpubExamples"
import XPubTool from "../components/xpubTool"
import NetworkSwitcher from "../components/networkSwitcher"

const DEFAULT_NETWORK = MAINNET // or TESTNET

const IndexPage = props => {
  const [network, setNetwork] = useState(DEFAULT_NETWORK)

  const handleNetworkChange = event => setNetwork(event.target.value)

  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <Container className="text-center">
        <Row>
          <Col>
            <NetworkSwitcher
              network={network}
              changeHandler={handleNetworkChange}
            />
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
      </Container>
    </Layout>
  )
}

export default IndexPage
