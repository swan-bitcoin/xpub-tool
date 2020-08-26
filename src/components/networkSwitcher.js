import React from "react"
import { Button, ButtonGroup } from "react-bootstrap"
import { MAINNET, TESTNET } from "unchained-bitcoin"

const NETWORKS = [MAINNET, TESTNET]

const NetworkSwitcher = props => {
  return (
    <ButtonGroup size="lg" className="mb-2">
      {NETWORKS.map(net => {
        return (
          <Button
            key={net}
            value={net}
            variant={net === props.network ? "secondary" : "outline-secondary"}
            size="sm"
            onClick={props.changeHandler}
          >
            {net}
          </Button>
        )
      })}
    </ButtonGroup>
  )
}

export default NetworkSwitcher
