import React, { useState, useMemo } from "react"
import { Alert } from "react-bootstrap"
import { MAINNET, validateExtendedPublicKey } from "unchained-bitcoin"
import { EXAMPLE_XPUBS, EXAMPLE_TPUBS } from "../components/xpubExamples"
import DerivedAddressesTable from "../components/derivedAddressesTable.js"
import AddressDerivationInput from "../components/addressDerivationInput.js"
import { accountDerivationPath } from "../lib/paths.js"
import { Purpose } from "../lib/xpub.js"

const XPubTool = props => {
  const exampleXPub =
    props.network === MAINNET ? EXAMPLE_XPUBS[0] : EXAMPLE_TPUBS[0]

  const [xpub, setXpub] = useState(exampleXPub)
  const [purpose, setPurpose] = useState(Purpose.P2SH) // default to 3addresses
  const [accountNumber, setAccountNumber] = useState(0)
  const [addressCount, setAddressCount] = useState(5)

  // derived state. gets cached and recomputed by `useMemo` whenever `xpub` or `props.network` change
  const isValidXpub = useMemo(
    () => validateExtendedPublicKey(xpub, props.network) === "",
    [xpub, props.network]
  )

  const handleXpubChange = event => setXpub(event.target.value)
  const handlePurposeChange = event => setPurpose(event.target.value)
  const handleAccountNumberChange = event =>
    setAccountNumber(event.target.value)
  const handleAddressCountChange = event => setAddressCount(event.target.value)

  return (
    <div>
      <AddressDerivationInput
        xpub={xpub}
        purpose={purpose}
        accountNumber={accountNumber}
        addressCount={addressCount}
        xpubHandler={handleXpubChange}
        purposeHandler={handlePurposeChange}
        accountNumberHandler={handleAccountNumberChange}
        addressCountHandler={handleAddressCountChange}
      />
      <p>
        <code>{accountDerivationPath(purpose, accountNumber)}/i</code>
      </p>
      {isValidXpub ? (
        <DerivedAddressesTable
          network={props.network}
          xpub={xpub}
          purpose={purpose}
          addressCount={addressCount}
          accountNumber={accountNumber}
        />
      ) : (
        <Alert variant="warning">Invalid xPub</Alert>
      )}
    </div>
  )
}

export default XPubTool
