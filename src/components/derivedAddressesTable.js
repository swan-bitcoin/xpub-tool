import React, { useMemo } from "react"
import { DerivedAddress } from "../lib/xpub.js"
import { Table } from "react-bootstrap"
import { maskXPub } from "../lib/xpub.js"

const DerivedAddressesTable = props => {
  const derivedAddress = new DerivedAddress(props.network)
  const addressList = useMemo(() => {
    let addresses = []

    for (let i = 0; i < props.addressCount; i++) {
      const address = derivedAddress.fromXpub(
        props.xpub,
        props.accountNumber,
        i,
        props.purpose
      )

      addresses.push(address)
    }

    return addresses
  }, [
    props.purpose,
    derivedAddress,
    props.addressCount,
    props.xpub,
    props.accountNumber,
  ])

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>
            Addresses for <code>{maskXPub(props.xpub)}</code>
          </th>
        </tr>
      </thead>
      <tbody>
        {addressList.map(({ address, path, fullPath }) => (
          <PathAddressRow
            key={address}
            path={path}
            address={address}
            fullPath={fullPath}
          />
        ))}
      </tbody>
    </Table>
  )
}

const PathAddressRow = props => (
  <tr>
    <td>
      <span title={props.fullPath}>{props.address}</span>
    </td>
  </tr>
)

export default DerivedAddressesTable
