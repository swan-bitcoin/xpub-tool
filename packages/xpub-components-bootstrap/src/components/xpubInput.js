import React, { useMemo } from "react"
import { Alert, Form } from "react-bootstrap"
import { isValidXpub } from "@swan/xpub-lib"

const XpubInput = ({ xpub, network, onChange }) => {
  const isValid = useMemo(() => isValidXpub(xpub, network), [xpub, network])

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

export { XpubInput }
