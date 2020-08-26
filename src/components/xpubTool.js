import React, { useState, useMemo } from "react"
import { MAINNET, validateExtendedPublicKey } from "unchained-bitcoin"
import { EXAMPLE_XPUBS, EXAMPLE_TPUBS } from "../components/xpubExamples"
import DerivedAddressesTable from "../components/derivedAddressesTable.js"
import AddressDerivationInput from "../components/addressDerivationInput.js"
import HardwareWallets from "../components/hardwareWallets.js"
import XPubInput from "../components/xpubInput.js"
import { Purpose } from "../lib/xpub.js"

const XPubTool = props => {
  const exampleXPub =
    props.network === MAINNET ? EXAMPLE_XPUBS[0] : EXAMPLE_TPUBS[0]

  const [xpub, setXpub] = useState(exampleXPub)
  const [purpose, setPurpose] = useState(Purpose.P2SH) // default to 3addresses
  const [accountNumber, setAccountNumber] = useState(0)
  const [addressCount, setAddressCount] = useState(3)

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
      {props.useHardware && (
        <HardwareWallets
          purpose={purpose}
          accountNumber={accountNumber}
          network={props.network}
        />
      )}
      <XPubInput
        xpub={xpub}
        network={props.network}
        changeHandler={handleXpubChange}
      />
      {props.useCustomPath && (
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
      )}
      {isValidXpub && (
        <DerivedAddressesTable
          network={props.network}
          xpub={xpub}
          purpose={purpose}
          addressCount={addressCount}
          accountNumber={accountNumber}
        />
      )}
    </div>
  )
}

export default XPubTool
