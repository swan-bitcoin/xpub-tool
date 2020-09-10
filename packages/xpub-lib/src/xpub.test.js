import { NETWORKS } from "unchained-bitcoin"
import {
  addressFromXpub,
  addressesFromXpub,
  getXpubType,
  isValidXpub,
} from "./xpub"

const VALID_XPUBS = [
  "xpub6CCHViYn5VzKSmKD9cK9LBDPz9wBLV7owXJcNDioETNvhqhVtj3ABnVUERN9aV1RGTX9YpyPHnC4Ekzjnr7TZthsJRBiXA4QCeXNHEwxLab",
  "xpub6D7NqpxWckGwCHhpXoL4pH38m5xVty62KY2wUh6JoyDCofwHciDRoQ3xm7WAg2ffpHaC6X4bEociYq81niyNUGhCxEs6fDFAd1LPbEmzcAm",
  "xpub6BfKpqjTwvH21wJGWEfxLppb8sU7C6FJge2kWb9315oP4ZVqCXG29cdUtkyu7YQhHyfA5nt63nzcNZHYmqXYHDxYo8mm1Xq1dAC7YtodwUR",
]

const VALID_TPUBS = [
  "tpubDCZv1xNTnmwmXe3BBMyXekiVreY853jFeC8k9AaEAqCDYi1ZTSTLH3uQonwCTRk9jL1SFu1cLNbDY76YtcDR8n2inSMwBEAdZs37EpYS9px",
  "tpubDEQApNpryrEgXYPwsqmQWoeirc5nt4yawFcjaSg5ENHBoEgfLnHuwzVehZG4Nn2qbfLjotwuZFrGkNHyt9EWWkfoVfaPWWsAsV9VopxgUYr",
  "tpubD9RP6BdSN6wdxmjNwVKu7NDFQNjwxSAq32Se4NM5AJGKaYpr4YHVSrq5BEbZH1pbqq17zXGQhXLAvvfVfWQESenVgHjmYgcjLQMpJfz4HoY",
]

const VALID_YPUBS = [
  "ypub6ZjkLiEwNDVeZ6VaFpaULvtV3sGT6n43CvrktC2G6H87ME8PTxCe59inL5QUWnRM4f5LVhkvxPsoR5C33Hqu4Bb3FY35oYPRp6d7CCfcqmo",
  "ypub6TgEG2U9Fvznqe16tYu5vbaEnPXpFUue1MVN2wXDH21fk9LXEgVGLL93t6dz6vA6Kg2R7ywzoZv9vPe6DUXud9n47T7CKW6xjXrX87MhYLU",
  "ypub6YdKsNXoig5FEiM57Qrr7GzePXGBYZQJX4NRhkgoWej1qbtAEZeLTdU3MABFhJAyDCrjnTWL8wZDbc2hzPAAYrzEaMa6W4W4BCnhpg5B7aW",
]
const VALID_UPUBS = [
  "upub5GGT3WZcGGFQZycqExe4iTxx8iL2BqXcJTXGTCALaoRvDjPD889bHZPXoRz3z9EGnx3GzCu7WuAPDnNUronFVDZjWsGJSUWpf63qVJqmGt1",
  "upub5ExvzmRuiP6T4XWG6qMi6NjQbMxnqmJewxwgHHTrkekfCfzCHvtWjLDWhhcXfsT7EnFiFGurxJJ7eNokXcZb2y6khVDEeiQJHbxBzKJ72AH",
  "upub5FNubXv4KESULE6ya9A42MzGcwkX2GneMy3rmUVEfLKe2veFd4y4f5WG5WjJp72eV162EGoLE8fsiYcQiSjEK8gYanA5sTEphsbXPvdizn4",
]

const VALID_ZPUBS = [
  "zpub6ssizzcfQnWpVVeQJ7zy5tXEWA5gqRo3cFLn1cM8z8tdqoTQPDoKayrj9zF4mraaNUTeHA6cSyb5qL93QdMFrzruEdGYjRC1hKEyghMhwZZ",
  "zpub6sL1LBEvyMhmE4HZ4nr3RbsuqVBqTsLiGLf1ogsTCdzVJ43ngxyrKrYMoDiTT7ka6MxYRUacQzgqCL6bdCHCjkSTmhi8aN1uom3xdkzXktK",
  "zpub6tHb7NmWm4nPu18fQ4Tk1xS4etNryiKVqti3A83i5mzcqZjFnMrX95hnYj6yj6zkpzRmkbNhvZE5vzhyiEstYLdG8SVZnbLrf341WDzvQWt",
]
const VALID_VPUBS = [
  "vpub5bTmE9K4QmkbLUnWm6pmKgRDLkckrJprBBUx49PwEEAqgb3ehJo45FamVZ481S3dvhaRbDnUrFxqDC61yLTGSEcHyvAA365DmsjpADBAqrB",
  "vpub5Ybrievs5pSmu6utBXJGqxLWZ9cNcL4qkPZAZd7vbM68tUKh7wewzRDTTEKtoqC25VvWEZbrTRuhhcx9eN7kYCxann64AzrbFtTG2Vq9zF5",
  "vpub5abgwCpBesPT6h2Z1Qg3GbemVfRnquT3ogegq97tPTfiaqALZJdfSEnB1cwWxY2C2Z3MsARyDLX2t7GqbZHterjT8P874KwMC4W89mm2Q4U",
]

const WASABI_XPUB =
  "xpub6CQtk4bkfG1d4UTWNBwmWGP95gjvTvEKZhm74CxLfbd4XqXY5wkyaUvLoWyy6Le24VxCqg2nASLu2xhNaDh5FhFDf8ndUUgbm8q1VDqCipy"
const WASABI_YPUB =
  "ypub6XFA3jGfowZ6umedCYjPiMUeFetNQYDpUpHKqbrE3bzwawLmLbvYCYaUpiwZ6FHwU951b9dLd6hSvFJwHv763vvpXUV44PW62rtesm5g4wa"
const WASABI_ZPUB =
  "zpub6r5RMPwaxd6am4qk2uX1vSa9Rd2pMADKPvoYczk7RcNpe39zbG66pcEcqvu969wrsnBpLdDu5m3zoXvW1cX6rAcRPpBUeJKaJaxJGLBWaLe"
const WASABI_ADDRESSES = [
  "bc1qcksx27qlksr2cy3pnwdw0mnm94c5cm0vz3jh6e",
  "bc1qw0c77zue3xduyh4jef3r3jhfpx30jxc7s5z7lv",
  "bc1ql4l5m2wnlcwl28rsu0k8k5rx7yjg9fkr2vld8p",
]

const SAMOURAI_ZPUB =
  "zpub6rk5rRte9pPyKTNuP2iKak9ZSEqvsXMP48TQoP23vjVDLeywBwJKcCzj1avQEybYVD1A9uTDmou8F5hcL6KFataVGjyzZxwYyDLqBEv9H8R"
const SAMOURAI_ADDRESSES = [
  "bc1qg7v2efej3lqmj828lcgfnedptrdncjv4mgpyfd",
  "bc1qjvpph2k4h3rvfdwrlczgsrs0ku6ymzq9z5ct2v",
  "bc1qtnew2mxs90w53qwta7wqhk89hruka6mqsrnkr8",
]

describe("isValidXpub", () => {
  test("invalid keys are invalid on mainnet", () => {
    expect(isValidXpub("", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidXpub("xpub...", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidXpub("ypub...", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidXpub("zpub...", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidXpub("tpub...", NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidXpub("upub...", NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidXpub("vpub...", NETWORKS.TESTNET)).toBeFalsy()
    expect(
      isValidXpub(
        "Xpub6D7NqpxWckGwCHhpXoL4pH38m5xVty62KY2wUh6JoyDCofwHciDRoQ3xm7WAg2ffpHaC6X4bEociYq81niyNUGhCxEs6fDFAd1LPbEmzcAm",
        NETWORKS.MAINNET
      )
    ).toBeFalsy()
    expect(
      isValidXpub(
        "xpub6BfKpqjTwvH21wJGWEfxLppb8sU7C6FJge2kWb9315oP4ZVqCXG29cdUtkyu7YQhHyfA5nt63nzcNZHYmqXYHDxYo8mm1Xq1dAC7YtodwUr",
        NETWORKS.MAINNET
      )
    ).toBeFalsy()
  })
  test("mainnet keys (xpub/ypub/zpub) are invalid on testnet", () => {
    expect(isValidXpub(VALID_XPUBS[0], NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidXpub(VALID_YPUBS[0], NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidXpub(VALID_ZPUBS[0], NETWORKS.TESTNET)).toBeFalsy()
  })
  test("testnet keys (tpub/upub/vpub) are invalid on mainnet", () => {
    expect(isValidXpub(VALID_TPUBS[0], NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidXpub(VALID_UPUBS[0], NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidXpub(VALID_VPUBS[0], NETWORKS.MAINNET)).toBeFalsy()
  })

  // BIP 32 and BIP 44: XPUB & TPUB
  test("mainnet xpub is valid", () => {
    expect(isValidXpub(VALID_XPUBS[0], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(VALID_XPUBS[1], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(VALID_XPUBS[2], NETWORKS.MAINNET)).toBeTruthy()
  })
  test("testnet xpub (tpub) is valid", () => {
    expect(isValidXpub(VALID_TPUBS[0], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(VALID_TPUBS[1], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(VALID_TPUBS[2], NETWORKS.TESTNET)).toBeTruthy()
  })

  // BIP 49: YPUB & UPUB
  test("mainnet ypub is valid", () => {
    expect(isValidXpub(VALID_YPUBS[0], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(VALID_YPUBS[1], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(VALID_YPUBS[2], NETWORKS.MAINNET)).toBeTruthy()
  })
  test("testnet ypub (upub) is valid", () => {
    expect(isValidXpub(VALID_UPUBS[0], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(VALID_UPUBS[1], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(VALID_UPUBS[2], NETWORKS.TESTNET)).toBeTruthy()
  })

  // BIP 84: ZPUB & VPUB
  test("mainnet zpub is valid", () => {
    expect(isValidXpub(VALID_ZPUBS[0], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(VALID_ZPUBS[1], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(VALID_ZPUBS[2], NETWORKS.MAINNET)).toBeTruthy()
  })
  test("testnet zpub (vpub) is valid", () => {
    expect(isValidXpub(VALID_VPUBS[0], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(VALID_VPUBS[1], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(VALID_VPUBS[2], NETWORKS.TESTNET)).toBeTruthy()
  })
})

describe("getXpubType", () => {
  test("xpub/tpub should be of type P2PKH (BIP 44)", () => {
    expect(getXpubType(VALID_XPUBS[0])).toBe("44")
    expect(getXpubType(VALID_TPUBS[0])).toBe("44")
  })
  test("ypub/upub should be of type P2SH (BIP 49)", () => {
    expect(getXpubType(VALID_YPUBS[0])).toBe("49")
    expect(getXpubType(VALID_UPUBS[0])).toBe("49")
  })
  test("zpub/vpub should be of type P2WPKH (BIP 84)", () => {
    expect(getXpubType(VALID_ZPUBS[0])).toBe("84")
    expect(getXpubType(VALID_VPUBS[0])).toBe("84")
  })
})

describe("addressFromXpub", () => {
  test("testnet address generation from mainnet key", () => {
    expect(
      addressFromXpub({
        xpub: VALID_XPUBS[0],
        addressCount: 1,
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: VALID_YPUBS[0],
        addressCount: 1,
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: VALID_ZPUBS[0],
        addressCount: 1,
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
  })
  test("mainnet address generation from testnet key", () => {
    expect(
      addressFromXpub({
        xpub: VALID_TPUBS[0],
        addressCount: 1,
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: VALID_UPUBS[0],
        addressCount: 1,
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: VALID_VPUBS[0],
        addressCount: 1,
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
  })
})

describe("addressesFromXpub", () => {
  test("default address generation from xpub on mainnet", () => {
    expect(
      addressesFromXpub({
        xpub: WASABI_XPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(WASABI_ADDRESSES)
  })
  test("default address generation from ypub on mainnet", () => {
    expect(
      addressesFromXpub({
        xpub: WASABI_YPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(WASABI_ADDRESSES)
  })
  test("default address generation from zpub on mainnet", () => {
    expect(
      addressesFromXpub({
        xpub: WASABI_ZPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(WASABI_ADDRESSES)
    expect(
      addressesFromXpub({
        xpub: SAMOURAI_ZPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(SAMOURAI_ADDRESSES)
    expect(
      addressesFromXpub({
        xpub: SAMOURAI_ZPUB,
        addressCount: 20, // generate 20 addresses
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)[19] // pick nr. 20 and compare
    ).toEqual("bc1qrkv7s6enp5n7nnz97g2em2q4jefcmt9208syg0")
  })
})
