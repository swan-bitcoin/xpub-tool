import React from "react"
import { Tabs, Tab } from "react-bootstrap"
import { LEDGER, TREZOR } from "unchained-wallets"

import XPubImporter from "./xpubImporter"
import { accountDerivationPath } from "../lib/paths"

const HardwareWallets = ({ purpose, accountNumber, network }) => {
  const path = accountDerivationPath(purpose, accountNumber, network)

  return (
    <Tabs id="hardware-wallet-selector">
      {[LEDGER, TREZOR].map(type => (
        <Tab key={type} eventKey={type} title={type.toUpperCase()}>
          <XPubImporter
            key={path}
            network={network}
            bip32Path={path}
            keystore={type}
          />
        </Tab>
      ))}
    </Tabs>
  )
}

export default HardwareWallets
