import React from "react"
import { Table } from "react-bootstrap"
import { getExtPubKeyMetadata } from "@swan/xpub-lib"

const ExtPubKeyMetadata = ({ extPubKey }) => {
  const meta = getExtPubKeyMetadata(extPubKey)
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
            <code>{extPubKey}</code>
          </th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table>
  )
}

export { ExtPubKeyMetadata }
