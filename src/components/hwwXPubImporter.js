// This is a React example but a similar
// pattern would work for other frameworks.
import React from "react"
import PropTypes from "prop-types"
import { Alert, Button } from "react-bootstrap"

// The `unchained-bitcoin` library is used by `unchained-wallets`.
import { MAINNET } from "unchained-bitcoin"

import {
  // This is the interaction we are implementing.
  ExportExtendedPublicKey,

  // These are the keystores we want to support.  They both
  // work identically as far as this minimal UI is concerned.
  // Other keystores are supported but they would require a
  // different UI.
  TREZOR,
  LEDGER,

  // These are  possible states our keystore could be in.
  PENDING,
  ACTIVE,
  UNSUPPORTED,
} from "unchained-wallets"

import { bip32HumanReadablePath } from "../lib/bip32path.js"

function maskXPub(xpub) {
  const beginning = xpub.substr(0, 15)
  const ending = xpub.substr(xpub.length - 10, xpub.length)
  return beginning + "...[REDACTED]..." + ending
}

class HWWXPubImporter extends React.Component {
  // For this example, the required arguments are
  // passed into this component via `props`.
  //
  // A more realistic example would provide a UI for
  // entering this or pull it from somewhere else.
  static propTypes = {
    network: PropTypes.string.isRequired,
    bip32Path: PropTypes.string.isRequired,
    keystore: PropTypes.string.isRequired,
  }

  // The interaction is stateless so can be instantiated
  // on the fly as needed, with appropriate arguments.
  interaction() {
    const { keystore, network, bip32Path } = this.props
    return ExportExtendedPublicKey({ keystore, network, bip32Path }, true)
  }

  constructor(props) {
    super(props)
    // Keystore state is kept in the React component
    // and passed to the library.
    this.state = {
      keystoreState: this.interaction().isSupported() ? PENDING : UNSUPPORTED,
      xpub: "",
      error: "",
    }
    this.importXPub = this.importXPub.bind(this)
  }

  render() {
    const { keystoreState, xpub, error } = this.state
    const { bip32Path } = this.props
    if (xpub) {
      return (
        <div>
          <Alert key={bip32Path} variant="success" dismissible>
            Imported {bip32HumanReadablePath(bip32Path)}
          </Alert>
          <p>
            <code>{maskXPub(xpub)}</code>
            <Button
              variant="light"
              title="Copy to clipboard"
              onClick={() => {
                navigator.clipboard.writeText(xpub)
              }}
            >
              <span>📋</span>
            </Button>
          </p>
        </div>
      )
    } else {
      return (
        <div>
          <h3>
            <code>{bip32Path}</code> ({bip32HumanReadablePath(bip32Path)})
          </h3>
          {this.renderMessages()}
          {error && <Alert type="danger">{error}</Alert>}
          <Button
            variant="outline-primary"
            disabled={keystoreState !== PENDING}
            onClick={this.importXPub}
            title={bip32HumanReadablePath(bip32Path)}
          >
            Import {bip32Path}
          </Button>
          <hr />
        </div>
      )
    }
  }

  renderMessages() {
    const { keystoreState } = this.state
    // Here we grab just the messages relevant for the
    // current keystore state, but more complex filtering is possible...
    const messages = this.interaction().messagesFor({ state: keystoreState })
    return messages.map(this.renderMessage)
  }

  renderMessage(message, i) {
    // The `message` object will always have a `text` property
    // but may have additional properties useful for display.
    return (
      <Alert variant="info" key={i}>
        {message.text}
      </Alert>
    )
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
}

export default HWWXPubImporter
