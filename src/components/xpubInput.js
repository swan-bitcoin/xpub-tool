import React, { useMemo } from "react"
import { Alert, Form } from "react-bootstrap"
import { validateExtendedPublicKey } from "unchained-bitcoin"

const XPubInput = props => {
  const isValidXpub = useMemo(
    () => validateExtendedPublicKey(props.xpub, props.network) === "",
    [props.xpub, props.network]
  )

  return (
    <Form>
      <Form.Group>
        <Form.Control
          size="lg"
          type="text"
          placeholder="xpub..."
          value={props.xpub}
          onChange={props.changeHandler}
        />
      </Form.Group>
      {!isValidXpub && <Alert variant="warning">Invalid xPub</Alert>}
    </Form>
  )
}

export default XPubInput
