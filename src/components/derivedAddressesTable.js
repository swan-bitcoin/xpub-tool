import React, { useMemo } from "react"
import { addressesFromXPub } from "../lib/xpub.js"
import { Table } from "react-bootstrap"
import { maskXPub } from "../lib/xpub.js"

const DerivedAddressesTable = props => {
  let addressList = useMemo(
    () =>
      addressesFromXPub(
        props.xpub,
        props.addressCount,
        props.accountNumber,
        props.purpose,
        props.network
      ),
    [
      props.xpub,
      props.addressCount,
      props.accountNumber,
      props.purpose,
      props.network,
    ]
  )

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
        {addressList.map(({ path, address }) => (
          <PathAddressRow key={path} path={path} address={address} />
        ))}
      </tbody>
    </Table>
  )
}

const PathAddressRow = props => (
  <tr>
    <td>
      <span title={props.path}>{props.address}</span>
    </td>
  </tr>
)

export default DerivedAddressesTable
