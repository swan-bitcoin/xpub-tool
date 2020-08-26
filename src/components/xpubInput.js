import React, { useMemo } from "react"
import { Alert, Form } from "react-bootstrap"
import { validateExtendedPublicKey } from "unchained-bitcoin"

const XPubInput = props => {
  const isValidXpub = useMemo(
    () => validateExtendedPublicKey(props.xpub, props.network) === "",
    [props.xpub, props.network]
  )

  const isEmptyXpub = props.xpub === ""
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
          value={props.xpub}
          onChange={props.changeHandler}
        />
      </Form.Group>
      {isFilled && !isValidXpub && (
        <Alert variant="warning">Invalid xPub</Alert>
      )}
    </Form>
  )
}

export default XPubInput
