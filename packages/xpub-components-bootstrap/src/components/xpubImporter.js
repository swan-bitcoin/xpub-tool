import React from "react"
import PropTypes from "prop-types"
import { Alert, Button } from "react-bootstrap"

import {
  NETWORKS,
  ExportExtendedPublicKey,
  PENDING,
  ACTIVE,
  UNSUPPORTED,
} from "@swan/xpub-lib"

import { humanReadableDerivationPath, maskXPub } from "@swan/xpub-lib"

class XPubImporter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keystoreState: this.interaction().isSupported() ? PENDING : UNSUPPORTED,
      xpub: "",
      error: "",
    }
    this.importXPub = this.importXPub.bind(this)
  }

  interaction() {
    const { network, bip32Path, keystore } = this.props
    return ExportExtendedPublicKey({ keystore, network, bip32Path })
  }

  async importXPub() {
    this.setState({ keystoreState: ACTIVE })
    try {
      // This is where we actually talk to the hardware wallet.
      const xpub = await this.interaction().run()
      // If we succeed, reset the keystore state
      // and store the imported public key.
      this.setState({ keystoreState: PENDING, xpub })
    } catch (e) {
      // Something went wrong; revert the keystore
      // state and track the error message.
      this.setState({ keystoreState: PENDING, error: e.message })
    }
  }

  renderMessages() {
    const { keystoreState } = this.state
    // Here we grab just the messages relevant for the
    // current keystore state, but more complex filtering is possible...
    const messages = this.interaction().messagesFor({ state: keystoreState })
    return messages.map(XPubImporter.renderMessage)
  }

  static renderMessage(message, i) {
    // The `message` object will always have a `text` property
    // but may have additional properties useful for display.
    return (
      <Alert variant="info" key={i}>
        {message.text}
      </Alert>
    )
  }

  render() {
    const { keystoreState, xpub, error } = this.state
    const { bip32Path } = this.props
    return (
      <div>
        <h3>
          {humanReadableDerivationPath({ bip32Path })} <code>{bip32Path}</code>
        </h3>
        {xpub ? (
          <div>
            <Alert key={bip32Path} variant="success" dismissible>
              Imported {humanReadableDerivationPath({ bip32Path })}
            </Alert>
            <p>
              <code>{maskXPub({ xpub })}</code>
              <Button
                variant="light"
                title="Copy to clipboard"
                onClick={() => {
                  navigator.clipboard.writeText(xpub)
                }}
              >
                <span role="img" aria-label="Copy to clipboard">
                  📋
                </span>
              </Button>
            </p>
          </div>
        ) : (
          <div>
            {this.renderMessages()}
            {error && <Alert type="danger">{error}</Alert>}
            <Button
              variant="outline-primary"
              disabled={keystoreState !== PENDING}
              onClick={this.importXPub}
              title={humanReadableDerivationPath({ bip32Path })}
            >
              Import {bip32Path}
            </Button>
          </div>
        )}
        <hr />
      </div>
    )
  }
}

XPubImporter.propTypes = {
  network: PropTypes.oneOf(Object.values(NETWORKS)).isRequired,
  bip32Path: PropTypes.string.isRequired,
  keystore: PropTypes.string.isRequired,
}

export default XPubImporter
