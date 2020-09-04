import React from "react"
import { Table } from "react-bootstrap"
import { getXpubMetadata } from "@swan/xpub-lib"

const XPubMetadata = ({ xpub }) => {
  const meta = getXpubMetadata(xpub)
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

export { XPubMetadata }
