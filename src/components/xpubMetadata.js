import React from "react"
import { Table } from "react-bootstrap"
import { getXpubMetadata } from "../lib/xpub"

const XPubMetadata = ({ xpub }) => {
  const {
    path,
    index,
    sequence,
    depth,
    pubkey,
    chaincode,
    parentFingerprint,
    network,
    version,
  } = getXpubMetadata(xpub)
  return (
    <Table>
      <tbody>
        <tr>
          <th>Path: </th>
          <td>{path}</td>
        </tr>
        <tr>
          <th>Index: </th>
          <td>{index}</td>
        </tr>
        <tr>
          <th>Sequence: </th>
          <td>{sequence}</td>
        </tr>
        <tr>
          <th>Depth: </th>
          <td>{depth}</td>
        </tr>
        <tr>
          <th>Pubkey: </th>
          <td>{pubkey}</td>
        </tr>
        <tr>
          <th>chaincode: </th>
          <td>{chaincode}</td>
        </tr>
        <tr>
          <th>Parent Fingerprint: </th>
          <td>{parentFingerprint}</td>
        </tr>
        <tr>
          <th>Network: </th>
          <td>{network}</td>
        </tr>
        <tr>
          <th>Version: </th>
          <td>{version}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default XPubMetadata
