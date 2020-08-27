import React from "react"
import PropTypes from "prop-types"
import { Form } from "react-bootstrap"
import { accountDerivationPath, Purpose, NETWORKS } from "../lib"

const AddressDerivationInput = props => {
  const MAX_ACCOUNTS = 22
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
          {accountDerivationPath(
            props.purpose,
            props.accountNumber,
            props.network
          )}
          /i
        </Form.Text>
      </Form.Group>
    </Form>
  )
}

AddressDerivationInput.propTypes = {
  purpose: PropTypes.oneOf(Object.values(Purpose)).isRequired,
  accountNumber: PropTypes.number.isRequired,
  onPurposeChange: PropTypes.func.isRequired,
  onAccountChange: PropTypes.func.isRequired,
}

export default AddressDerivationInput
