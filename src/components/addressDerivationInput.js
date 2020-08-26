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
    <Form inline>
      <Form.Group>
        <Form.Label className="my-1 mr-2">BIP</Form.Label>
        <Form.Control
          as="select"
          size="sm"
          name="purpose"
          className="my-1 mr-sm-2"
          value={props.purpose}
          onChange={props.purposeHandler}
        >
          {Object.values(Purpose).map(type => (
            <option key={type}>{type}</option>
          ))}
        </Form.Control>
        <Form.Label className="my-1 mr-2">Account Nr.</Form.Label>
        <Form.Control
          as="select"
          size="sm"
          name="accountNumber"
          className="my-1 mr-sm-2"
          value={props.accountNumber}
          onChange={props.accountNumberHandler}
        >
          {accountList}
        </Form.Control>
        <Form.Text muted>
          Derivation path:{" "}
          {accountDerivationPath(props.purpose, props.accountNumber)}/i
        </Form.Text>
      </Form.Group>
    </Form>
  )
}

export default AddressDerivationInput
