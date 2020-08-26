import React from "react"

import { MAINNET, networkLabel } from "unchained-bitcoin"

// Mainnet: xpub...
// Testnet: tpub...
const EXAMPLE_XPUBS = [
  "xpub6CCHViYn5VzKSmKD9cK9LBDPz9wBLV7owXJcNDioETNvhqhVtj3ABnVUERN9aV1RGTX9YpyPHnC4Ekzjnr7TZthsJRBiXA4QCeXNHEwxLab",
  "xpub6D7NqpxWckGwCHhpXoL4pH38m5xVty62KY2wUh6JoyDCofwHciDRoQ3xm7WAg2ffpHaC6X4bEociYq81niyNUGhCxEs6fDFAd1LPbEmzcAm",
  "xpub6BfKpqjTwvH21wJGWEfxLppb8sU7C6FJge2kWb9315oP4ZVqCXG29cdUtkyu7YQhHyfA5nt63nzcNZHYmqXYHDxYo8mm1Xq1dAC7YtodwUR",
]
const EXAMPLE_TPUBS = [
  "tpubDCZv1xNTnmwmXe3BBMyXekiVreY853jFeC8k9AaEAqCDYi1ZTSTLH3uQonwCTRk9jL1SFu1cLNbDY76YtcDR8n2inSMwBEAdZs37EpYS9px",
]

const XPubExamples = props => {
  const pubs = props.network === MAINNET ? EXAMPLE_XPUBS : EXAMPLE_TPUBS

  return (
    <div>
      <p>{networkLabel(props.network)} example xpubs:</p>
      <ul>
        {pubs.map((pub, i) => (
          <li key={i}>
            <code>{pub}</code>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { XPubExamples, EXAMPLE_XPUBS, EXAMPLE_TPUBS }
