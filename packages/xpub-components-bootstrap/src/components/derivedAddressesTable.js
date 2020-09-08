import React from "react"
import { Table } from "react-bootstrap"
import { maskKey } from "@swan/xpub-lib"

const DerivedAddressesTable = ({ addressList, showCount, xpub }) => {
  return (
    <Table bordered>
      <thead>
        <tr>
          <th>
            Addresses for <code>{maskKey(xpub)}</code>
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

const PathAddressRow = ({ path, address }) => (
  <tr>
    <td>
      <span title={path}>{address}</span>
    </td>
  </tr>
)

export { DerivedAddressesTable }