import React, { useMemo } from "react"
import { Alert, Form } from "react-bootstrap"
import { isValidXPub } from "@swan/xpub-lib"

const XPubInput = ({ xpub, network, onChange }) => {
  const isValid = useMemo(() => isValidXPub(xpub, network), [xpub, network])

  const isEmptyXpub = xpub === ""
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
          value={xpub}
          onChange={onChange}
        />
      </Form.Group>
      {isFilled && !isValid && <Alert variant="warning">Invalid xPub</Alert>}
    </Form>
  )
}

export { XPubInput }
