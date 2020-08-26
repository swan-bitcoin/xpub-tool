import React from "react"
import { Row, Col, Container } from "react-bootstrap"

import Layout from "../components/layout"

const IndexPage = props => {
  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <Container className="text-center">
        <Row>
          <Col>TODO</Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
