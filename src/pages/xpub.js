import React, { useState } from "react"
import { Row, Col, Container } from "react-bootstrap"
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
    <Layout pageInfo={{ pageName: "xpub" }}>
      <Container className="text-center">
        <Row>
          <Col>
            <XPubTool network={network} />
          </Col>
        </Row>
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
