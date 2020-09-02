import React, { useMemo } from "react"
import { Alert, Form } from "react-bootstrap"
import { validateExtendedPublicKey } from "unchained-bitcoin"
import XPubMetadata from "./xpubMetadata"

const XPubInput = ({ xpub, network, onChange }) => {
  const isValidXpub = useMemo(
    () => validateExtendedPublicKey(xpub, network) === "",
    [xpub, network]
  )

  const isEmptyXpub = xpub === ""
  const isFilled = !isEmptyXpub

  return (
    <Form noValidate>
      <Form.Group>
        <Form.Control
          isValid={isFilled && isValidXpub}
          isInvalid={isFilled && !isValidXpub}
          size="lg"
          type="password"
          placeholder="xpub..."
          value={xpub}
          onChange={onChange}
        />
      </Form.Group>
      {isFilled && !isValidXpub && (
        <Alert variant="warning">Invalid xPub</Alert>
      )}
    </Form>
  )
}

export default XPubInput
