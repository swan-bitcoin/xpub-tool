import { NETWORKS } from "unchained-bitcoin"
import { KEYS } from "../test/fixtures"
import { getXpubType, getNetworkFromXpub, getXpubMetadata } from "./metadata"

describe("getNetworkFromXpub", () => {
  test("xpub/ypub/zpub should be mainnet", () => {
    expect(getNetworkFromXpub(KEYS.MAIN.XPUB[0])).toBe(NETWORKS.MAINNET)
    expect(getNetworkFromXpub(KEYS.MAIN.YPUB[0])).toBe(NETWORKS.MAINNET)
    expect(getNetworkFromXpub(KEYS.MAIN.ZPUB[0])).toBe(NETWORKS.MAINNET)
  })
  test("tpub/upub/vpub should be mainnet", () => {
    expect(getNetworkFromXpub(KEYS.TEST.TPUB[0])).toBe(NETWORKS.TESTNET)
    expect(getNetworkFromXpub(KEYS.TEST.UPUB[0])).toBe(NETWORKS.TESTNET)
    expect(getNetworkFromXpub(KEYS.TEST.VPUB[0])).toBe(NETWORKS.TESTNET)
  })
  test("invalid key should be undefined", () => {
    expect(getNetworkFromXpub("abc")).toBeFalsy()
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
