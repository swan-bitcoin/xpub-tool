import React from "react"
import { Table } from "react-bootstrap"
import { maskKey, segment } from "@swan-bitcoin/xpub-lib"

const DerivedAddressesTable = ({ addressList, showCount, extPubKey }) => {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>
            Addresses for <code>{maskKey(extPubKey)}</code>
          </th>
        </tr>
      </thead>
      <tbody>
        {addressList.map(({ path, address }, i) => {
          return (
            i < (showCount || addressList.length) && (
              <PathAddressRow key={path} path={path} address={address} />
            )
          )
        })}
        <PathAddressRow path="..." address="..." />
      </tbody>
    </Table>
  )
}

const PathAddressRow = ({ path, address }) => {
  const segments = segment(address)
  return (
    <tr>
      <td>
        <span title={path}>
          <strong>{segments[0]}</strong> {segments[1]}{" "}
          <strong>{segments[2]}</strong>
        </span>
      </td>
    </tr>
  )
}

export { DerivedAddressesTable }
