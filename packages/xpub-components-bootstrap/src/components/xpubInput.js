import React, { useMemo } from "react"
import { Alert, Form } from "react-bootstrap"
import { isValidExtPubKey } from "@swan-bitcoin/xpub-lib"

const ExtPubKeyInput = ({ extPubKey, network, onChange }) => {
  const isValid = useMemo(() => isValidExtPubKey(extPubKey, network), [
    extPubKey,
    network,
  ])

  const isEmptyExtPubKey = extPubKey === ""
  const isFilled = !isEmptyExtPubKey

  return (
    <Form noValidate>
      <Form.Group>
        <Form.Control
          isValid={isFilled && isValid}
          isInvalid={isFilled && !isValid}
          size="lg"
          type="password"
          placeholder="xpub..."
          value={extPubKey}
          onChange={onChange}
        />
      </Form.Group>
      {isFilled && !isValid && (
        <Alert variant="warning">Invalid public key</Alert>
      )}
    </Form>
  )
}

export { ExtPubKeyInput }
