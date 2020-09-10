import { NETWORKS } from "unchained-bitcoin"
import { KEY, KEYS } from "../test/fixtures.js"
import Purpose from "./purpose"

import {
  addressFromXpub,
  addressesFromXpub,
  getXpubType,
  isValidXpub,
} from "./xpub"

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
    expect(isValidXpub(KEYS.MAIN.XPUB[0], NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidXpub(KEYS.MAIN.YPUB[0], NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidXpub(KEYS.MAIN.ZPUB[0], NETWORKS.TESTNET)).toBeFalsy()
  })
  test("testnet keys (tpub/upub/vpub) are invalid on mainnet", () => {
    expect(isValidXpub(KEYS.TEST.TPUB[0], NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidXpub(KEYS.TEST.UPUB[0], NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidXpub(KEYS.TEST.VPUB[0], NETWORKS.MAINNET)).toBeFalsy()
  })

  // BIP 32 and BIP 44: XPUB & TPUB
  test("mainnet xpub is valid", () => {
    expect(isValidXpub(KEYS.MAIN.XPUB[0], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(KEYS.MAIN.XPUB[1], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(KEYS.MAIN.XPUB[2], NETWORKS.MAINNET)).toBeTruthy()
  })
  test("testnet xpub (tpub) is valid", () => {
    expect(isValidXpub(KEYS.TEST.TPUB[0], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(KEYS.TEST.TPUB[1], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(KEYS.TEST.TPUB[2], NETWORKS.TESTNET)).toBeTruthy()
  })

  // BIP 49: YPUB & UPUB
  test("mainnet ypub is valid", () => {
    expect(isValidXpub(KEYS.MAIN.YPUB[0], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(KEYS.MAIN.YPUB[1], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(KEYS.MAIN.YPUB[2], NETWORKS.MAINNET)).toBeTruthy()
  })
  test("testnet ypub (upub) is valid", () => {
    expect(isValidXpub(KEYS.TEST.UPUB[0], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(KEYS.TEST.UPUB[1], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(KEYS.TEST.UPUB[2], NETWORKS.TESTNET)).toBeTruthy()
  })

  // BIP 84: ZPUB & VPUB
  test("mainnet zpub is valid", () => {
    expect(isValidXpub(KEYS.MAIN.ZPUB[0], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(KEYS.MAIN.ZPUB[1], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidXpub(KEYS.MAIN.ZPUB[2], NETWORKS.MAINNET)).toBeTruthy()
  })
  test("testnet zpub (vpub) is valid", () => {
    expect(isValidXpub(KEYS.TEST.VPUB[0], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(KEYS.TEST.VPUB[1], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidXpub(KEYS.TEST.VPUB[2], NETWORKS.TESTNET)).toBeTruthy()
  })
})

describe("getXpubType", () => {
  test("xpub/tpub should be of type P2PKH (BIP 44)", () => {
    expect(getXpubType(KEYS.MAIN.XPUB[0])).toBe("44")
    expect(getXpubType(KEYS.TEST.TPUB[0])).toBe("44")
  })
  test("ypub/upub should be of type P2SH (BIP 49)", () => {
    expect(getXpubType(KEYS.MAIN.YPUB[0])).toBe("49")
    expect(getXpubType(KEYS.TEST.UPUB[0])).toBe("49")
  })
  test("zpub/vpub should be of type P2WPKH (BIP 84)", () => {
    expect(getXpubType(KEYS.MAIN.ZPUB[0])).toBe("84")
    expect(getXpubType(KEYS.TEST.VPUB[0])).toBe("84")
  })
})

describe("addressFromXpub(MAINNET)", () => {
  // BIP 44
  test("P2PKH address generation from xpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.XPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.LEGACY)
  })
  test("P2PKH address generation from ypub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.YPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.LEGACY)
  })
  test("P2PKH address generation from zpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.ZPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.LEGACY)
  })

  // BIP 49
  test("P2SH address generation from xpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.XPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.SEGWIT)
  })
  test("P2SH address generation from ypub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.YPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.SEGWIT)
  })
  test("P2SH address generation from zpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.ZPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.SEGWIT)
  })

  // BIP 84
  test("P2WPKH address generation from xpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.XPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.BECH32)
  })
  test("P2WPKH address generation from ypub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.YPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.BECH32)
  })
  test("P2WPKH address generation from zpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.ZPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.BECH32)
  })
})

describe("addressFromXpub", () => {
  test("forbid testnet address generation from mainnet key", () => {
    expect(
      addressFromXpub({
        xpub: KEYS.MAIN.XPUB[0],
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: KEYS.MAIN.YPUB[0],
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: KEYS.MAIN.ZPUB[0],
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
  })
  test("forbid mainnet address generation from testnet key", () => {
    expect(
      addressFromXpub({
        xpub: KEYS.TEST.TPUB[0],
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: KEYS.TEST.UPUB[0],
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: KEYS.TEST.VPUB[0],
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
