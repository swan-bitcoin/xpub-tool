import React, { useState } from "react"
import { Row, Col, Container, ListGroup } from "react-bootstrap"
import { MAINNET } from "unchained-bitcoin"

import Layout from "../components/layout"
import XPubTool from "../components/xpubTool"
import NetworkSwitcher from "../components/networkSwitcher"

const DEFAULT_NETWORK = MAINNET // or TESTNET

const IndexPage = props => {
  const [network, setNetwork] = useState(DEFAULT_NETWORK)

  const handleNetworkChange = event => setNetwork(event.target.value)

  return (
    <Layout pageInfo={{ pageName: "hardware" }}>
      <Container className="text-center">
        <Row>
          <Col>
            <XPubTool network={network} useHardware={true} />
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
