import React from "react"
import { Form } from "react-bootstrap"

const XPubInput = props => {
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
    </Form>
  )
}

export default XPubInput
