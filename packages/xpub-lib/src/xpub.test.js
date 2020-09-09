import { NETWORKS } from "unchained-bitcoin"
import { isValidXpub } from "./xpub"

describe("isValidXpub", () => {
  test("mainnet xpub is valid", () => {
    expect(
      isValidXpub(
        "xpub6CCHViYn5VzKSmKD9cK9LBDPz9wBLV7owXJcNDioETNvhqhVtj3ABnVUERN9aV1RGTX9YpyPHnC4Ekzjnr7TZthsJRBiXA4QCeXNHEwxLab",
        NETWORKS.MAINNET
      )
    ).toBeTruthy()
    expect(
      isValidXpub(
        "xpub6D7NqpxWckGwCHhpXoL4pH38m5xVty62KY2wUh6JoyDCofwHciDRoQ3xm7WAg2ffpHaC6X4bEociYq81niyNUGhCxEs6fDFAd1LPbEmzcAm",
        NETWORKS.MAINNET
      )
    ).toBeTruthy()
    expect(
      isValidXpub(
        "xpub6BfKpqjTwvH21wJGWEfxLppb8sU7C6FJge2kWb9315oP4ZVqCXG29cdUtkyu7YQhHyfA5nt63nzcNZHYmqXYHDxYo8mm1Xq1dAC7YtodwUR",
        NETWORKS.MAINNET
      )
    ).toBeTruthy()
  })
  test("testnet xpub is valid", () => {
    expect(
      isValidXpub(
        "tpubDCZv1xNTnmwmXe3BBMyXekiVreY853jFeC8k9AaEAqCDYi1ZTSTLH3uQonwCTRk9jL1SFu1cLNbDY76YtcDR8n2inSMwBEAdZs37EpYS9px",
        NETWORKS.TESTNET
      )
    ).toBeTruthy()
    expect(
      isValidXpub(
        "tpubDEQApNpryrEgXYPwsqmQWoeirc5nt4yawFcjaSg5ENHBoEgfLnHuwzVehZG4Nn2qbfLjotwuZFrGkNHyt9EWWkfoVfaPWWsAsV9VopxgUYr",
        NETWORKS.TESTNET
      )
    ).toBeTruthy()
    expect(
      isValidXpub(
        "tpubD9RP6BdSN6wdxmjNwVKu7NDFQNjwxSAq32Se4NM5AJGKaYpr4YHVSrq5BEbZH1pbqq17zXGQhXLAvvfVfWQESenVgHjmYgcjLQMpJfz4HoY",
        NETWORKS.TESTNET
      )
    ).toBeTruthy()
  })
})

// const EXAMPLE_XPUBS = [
//   "ypub6ZjkLiEwNDVeZ6VaFpaULvtV3sGT6n43CvrktC2G6H87ME8PTxCe59inL5QUWnRM4f5LVhkvxPsoR5C33Hqu4Bb3FY35oYPRp6d7CCfcqmo",
//   "ypub6TgEG2U9Fvznqe16tYu5vbaEnPXpFUue1MVN2wXDH21fk9LXEgVGLL93t6dz6vA6Kg2R7ywzoZv9vPe6DUXud9n47T7CKW6xjXrX87MhYLU",
//   "ypub6YdKsNXoig5FEiM57Qrr7GzePXGBYZQJX4NRhkgoWej1qbtAEZeLTdU3MABFhJAyDCrjnTWL8wZDbc2hzPAAYrzEaMa6W4W4BCnhpg5B7aW",
//   "zpub6ssizzcfQnWpVVeQJ7zy5tXEWA5gqRo3cFLn1cM8z8tdqoTQPDoKayrj9zF4mraaNUTeHA6cSyb5qL93QdMFrzruEdGYjRC1hKEyghMhwZZ",
//   "zpub6sL1LBEvyMhmE4HZ4nr3RbsuqVBqTsLiGLf1ogsTCdzVJ43ngxyrKrYMoDiTT7ka6MxYRUacQzgqCL6bdCHCjkSTmhi8aN1uom3xdkzXktK",
//   "zpub6tHb7NmWm4nPu18fQ4Tk1xS4etNryiKVqti3A83i5mzcqZjFnMrX95hnYj6yj6zkpzRmkbNhvZE5vzhyiEstYLdG8SVZnbLrf341WDzvQWt",
// ]
// const EXAMPLE_TPUBS = [
//   "",
//   "",
//   "upub5GGT3WZcGGFQZycqExe4iTxx8iL2BqXcJTXGTCALaoRvDjPD889bHZPXoRz3z9EGnx3GzCu7WuAPDnNUronFVDZjWsGJSUWpf63qVJqmGt1",
//   "vpub5bTmE9K4QmkbLUnWm6pmKgRDLkckrJprBBUx49PwEEAqgb3ehJo45FamVZ481S3dvhaRbDnUrFxqDC61yLTGSEcHyvAA365DmsjpADBAqrB",
// ]
