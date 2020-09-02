import React, { useMemo } from "react"
import { Alert, Form } from "react-bootstrap"
import { validateExtendedPublicKey, ExtendedPublicKey } from "unchained-bitcoin"

const XPubInput = ({ xpub, network, onChange }) => {
  const isValidXpub = useMemo(
    () => validateExtendedPublicKey(xpub, network) === "",
    [xpub, network]
  )

  const isEmptyXpub = xpub === ""
  const isFilled = !isEmptyXpub

  const xpubObj = isValidXpub ? ExtendedPublicKey.fromBase58(xpub) : {}

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
          path: {xpubObj.path}
          index: {xpubObj.index}
          sequence: {xpubObj.sequence}
          depth: {xpubObj.depth}
          pubkey: {xpubObj.pubkey}
          chaincode: {xpubObj.chaincode}
          parentfingerprint: {xpubObj.parentFingerprint}
          network: {xpubObj.network}
          version: {xpubObj.version}
        </p>
      )}
    </Form>
  )
}

export default XPubInput
