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

class HardwareWalletExtendedPublicKeyImporter extends React.Component {
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
      publicKey: "",
      error: "",
    }
    this.importPublicKey = this.importPublicKey.bind(this)
  }

  render() {
    const { keystoreState, publicKey, error } = this.state
    const { bip32Path } = this.props
    if (publicKey) {
      return (
        <div>
          <p>xPub for BIP32 path {bip32Path}:</p>
          <p>
            <code>{publicKey}</code>
          </p>
        </div>
      )
    } else {
      return (
        <div>
          {this.renderMessages()}
          {error && <Alert type="danger">{error}</Alert>}
          <Button
            variant="outline-primary"
            disabled={keystoreState !== PENDING}
            onClick={this.importPublicKey}
          >
            Import xPub {bip32Path}
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

  async importPublicKey() {
    this.setState({ keystoreState: ACTIVE })
    try {
      // This is where we actually talk to the hardware wallet.
      const publicKey = await this.interaction().run()
      // If we succeed, reset the keystore state
      // and store the imported public key.
      this.setState({ keystoreState: PENDING, publicKey })
    } catch (e) {
      // Something went wrong; revert the keystore
      // state and track the error message.
      this.setState({ keystoreState: PENDING, error: e.message })
    }
  }
}

export default HardwareWalletExtendedPublicKeyImporter
