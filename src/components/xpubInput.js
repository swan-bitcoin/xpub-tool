import React, { useMemo } from "react"
import { Alert, Form } from "react-bootstrap"
import { validateExtendedPublicKey } from "unchained-bitcoin"
import { getXpubMetadata } from "../lib/xpub"

const XPubInput = ({ xpub, network, onChange }) => {
  const isValidXpub = useMemo(
    () => validateExtendedPublicKey(xpub, network) === "",
    [xpub, network]
  )

  const isEmptyXpub = xpub === ""
  const isFilled = !isEmptyXpub

  const { depth, network: xnet, version } = getXpubMetadata(xpub)

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
      {isValidXpub && (
        <p>
          depth: {depth}, network: {xnet}, version: {version}
        </p>
      )}
    </Form>
  )
}

export default XPubInput
