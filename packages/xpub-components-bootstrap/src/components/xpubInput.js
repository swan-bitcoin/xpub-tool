import React, { useMemo } from "react"
import { Alert, Form } from "react-bootstrap"
import { isValidXpub } from "@swan/xpub-lib"

const XpubInput = ({ extPubKey, network, onChange }) => {
  const isValid = useMemo(() => isValidXpub(extPubKey, network), [
    extPubKey,
    network,
  ])

  const isEmptyXpub = extPubKey === ""
  const isFilled = !isEmptyXpub

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

export { XpubInput }
