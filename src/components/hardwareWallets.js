import React from "react"
import { Tabs, Tab } from "react-bootstrap"
import { LEDGER, TREZOR } from "unchained-wallets"

import XPubImporter from "../components/XPubImporter.js"
import { accountDerivationPath } from "../lib/paths.js"

const HardwareWallets = props => {
  const path = accountDerivationPath(
    props.purpose,
    props.accountNumber,
    props.network
  )

  return (
    <Tabs id="hardware-wallet-selector">
      {[LEDGER, TREZOR].map(type => (
        <Tab key={type} eventKey={type} title={type.toUpperCase()}>
          <XPubImporter
            key={path}
            network={props.network}
            bip32Path={path}
            keystore={type}
          />
        </Tab>
      ))}
    </Tabs>
  )
}

export default HardwareWallets
