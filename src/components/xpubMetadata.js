import React from "react"
import { Table } from "react-bootstrap"
import { getXpubMetadata } from "../lib/xpub"

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
    <Table>
      <tbody>{tableRows}</tbody>
    </Table>
  )
}

export default XPubMetadata
