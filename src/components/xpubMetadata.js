import React from "react"
import { Table } from "react-bootstrap"
import { maskXPub, getXpubMetadata } from "../lib/xpub"

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
      <thead>
        <tr>
          <th colSpan="2">
            Metadata for <code>{maskXPub({ xpub })}</code>
          </th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table>
  )
}

export default XPubMetadata
