import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { Form } from "react-bootstrap"
import { accountDerivationPath, Purpose } from "@swan-bitcoin/xpub-lib"

const AddressDerivationInput = ({
  maxAccounts = 22,
  accountNumber,
  network,
  purpose,
  onPurposeChange: purposeChangeHandler,
  onAccountNumberChange: accountNumberChangeHandler,
}) => {
  const accountList = useMemo(
    // eslint-disable-next-line react/no-array-index-key
    () => [...Array(maxAccounts)].map((_, i) => <option key={i}>{i}</option>),
    [maxAccounts]
  )

  return (
    <Form inline>
      <Form.Group>
        <Form.Label className="my-1 mr-2">BIP</Form.Label>
        <Form.Control
          as="select"
          size="sm"
          name="purpose"
          className="my-1 mr-sm-2"
          value={purpose}
          onChange={purposeChangeHandler}
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
          value={accountNumber}
          onChange={accountNumberChangeHandler}
        >
          {accountList}
        </Form.Control>
        <Form.Text muted>
          Derivation path:{" "}
          {accountDerivationPath({ purpose, accountNumber, network })}
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
  onAccountNumberChange: PropTypes.func.isRequired,
}

export { AddressDerivationInput }
