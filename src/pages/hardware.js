import React, { useState } from "react"
import { Tabs, Tab, Container } from "react-bootstrap"
import { TESTNET } from "unchained-bitcoin"
import { LEDGER, TREZOR } from "unchained-wallets"

import Layout from "../components/layout"
import XPubImporter from "../components/XPubImporter.js"
import AddressDerivationInput from "../components/addressDerivationInput.js"
import { accountDerivationPath } from "../lib/paths.js"
import { Purpose } from "../lib/xpub.js"

const DEFAULT_NETWORK = TESTNET

const HWW = props => {
  const [accountNumber, setAccountNumber] = useState(0)
  let bip32Paths = Object.values(Purpose).map(purpose => {
    return accountDerivationPath(
      purpose,
      accountNumber,
      props.network || DEFAULT_NETWORK
    )
  })

  const handleAccountNumberChange = event =>
    setAccountNumber(event.target.value)

  let accountList = []
  for (var i = 0; i < 25; i++) {
    accountList.push(<option key={i}>{i}</option>)
  }

  return (
    <Layout pageInfo={{ pageName: "hardware" }}>
      <Container>
        <AddressDerivationInput
          // xpub={xpub} // TODO: optionals
          // purpose={purpose}
          accountNumber={accountNumber}
          // xpubHandler={handleXpubChange}
          // purposeHandler={handlePurposeChange}
          accountNumberHandler={handleAccountNumberChange}
        />
        <Tabs id="hardware-wallet-selector">
          {[LEDGER, TREZOR].map(type => (
            <Tab key={type} eventKey={type} title={type.toUpperCase()}>
              {bip32Paths.map(path => (
                <XPubImporter
                  key={path}
                  network={props.network}
                  bip32Path={path}
                  keystore={type}
                />
              ))}
            </Tab>
          ))}
        </Tabs>
      </Container>
    </Layout>
  )
}

export default HWW
