import { NETWORKS } from "unchained-bitcoin"
import { KEY, KEYS, WASABI, SAMOURAI } from "../test/fixtures"
import Purpose from "./purpose"

import {
  addressFromXpub,
  addressesFromXpub,
  getXpubType,
  isValidXpub,
} from "./xpub"

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
