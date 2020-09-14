import React from "react"
import { Table } from "react-bootstrap"
import { getExtPubKeyMetadata } from "@swan/xpub-lib"

const ExtPubKeyMetadata = ({ xpub }) => {
  const meta = getExtPubKeyMetadata(xpub)
  const tableRows = []
  Object.entries(meta).forEach(([key, value]) => {
    tableRows.push(
      <tr key={key}>
        <th>{key}</th>
        <td>{value}</td>
      </tr>
    )
  })

  return (
    <Table variant="dark">
      <thead>
        <tr>
          <th colSpan="2">
            <code>{xpub}</code>
          </th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table>
  )
}

export { ExtPubKeyMetadata }
