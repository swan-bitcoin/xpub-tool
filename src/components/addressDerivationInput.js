import React from "react"
import { Row, Col, Form } from "react-bootstrap"
import { Purpose } from "../lib/xpub.js"
import { accountDerivationPath } from "../lib/paths.js"

const AddressDerivationInput = props => {
  const MAX_ACCOUNTS = 25
  let accountList = []
  for (var i = 0; i < MAX_ACCOUNTS; i++) {
    accountList.push(<option key={i}>{i}</option>)
  }

  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          BIP
        </Form.Label>
        <Col sm="10">
          <Form.Control
            as="select"
            size="sm"
            name="purpose"
            value={props.purpose}
            onChange={props.purposeHandler}
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
            value={props.accountNumber}
            onChange={props.accountNumberHandler}
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
            value={props.addressCount}
            onChange={props.addressCountHandler}
          />
        </Col>
      </Form.Group>
      <p>
        <code>
          {accountDerivationPath(props.purpose, props.accountNumber)}/i
        </code>
      </p>
    </Form>
  )
}

export default AddressDerivationInput
