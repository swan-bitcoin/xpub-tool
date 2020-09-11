import { NETWORKS } from "unchained-bitcoin"
import { KEY } from "../test/fixtures"

import { convertToBIP32 } from "./conversion"

describe("convertToBIP32", () => {
  test("no conversion if none is required", () => {
    expect(convertToBIP32(KEY.MAIN.XPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToBIP32(KEY.TEST.TPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
  })
  test("conversion of mainnet keys", () => {
    expect(convertToBIP32(KEY.MAIN.YPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToBIP32(KEY.MAIN.ZPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
  })
  test("conversion of testnet keys", () => {
    expect(convertToBIP32(KEY.TEST.UPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
    expect(convertToBIP32(KEY.TEST.VPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
  })
  test("conversion of mainnet keys to testnet keys", () => {
    expect(convertToBIP32(KEY.MAIN.XPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
    expect(convertToBIP32(KEY.MAIN.YPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
    expect(convertToBIP32(KEY.MAIN.ZPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
  })
  test("conversion of testnet keys to mainnet keys", () => {
    expect(convertToBIP32(KEY.TEST.TPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToBIP32(KEY.TEST.UPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToBIP32(KEY.TEST.VPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
  })
})
