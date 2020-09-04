import React from "react"
import { Tabs, Tab } from "react-bootstrap"

import { LEDGER, TREZOR, accountDerivationPath } from "@swan/xpub-lib"
import { XpubImporter } from "./xpubImporter"

const HardwareWallets = ({ purpose, accountNumber, network }) => {
  const path = accountDerivationPath({ purpose, accountNumber, network })

  return (
    <Tabs id="hardware-wallet-selector">
      {[LEDGER, TREZOR].map(type => (
        <Tab key={type} eventKey={type} title={type.toUpperCase()}>
          <XpubImporter
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

export { HardwareWallets }
