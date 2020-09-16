import { NETWORKS } from "unchained-bitcoin"
import { KEY } from "../test/fixtures"

import { convertToXPUB } from "./conversion"

describe("convertToXPUB", () => {
  test("no conversion if none is required", () => {
    expect(convertToXPUB(KEY.MAIN.XPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToXPUB(KEY.TEST.TPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
  })
  test("conversion of mainnet keys", () => {
    expect(convertToXPUB(KEY.MAIN.YPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToXPUB(KEY.MAIN.ZPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
  })
  test("conversion of testnet keys", () => {
    expect(convertToXPUB(KEY.TEST.UPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
    expect(convertToXPUB(KEY.TEST.VPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
  })
  test("conversion of mainnet keys to testnet keys", () => {
    expect(convertToXPUB(KEY.MAIN.XPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
    expect(convertToXPUB(KEY.MAIN.YPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
    expect(convertToXPUB(KEY.MAIN.ZPUB, NETWORKS.TESTNET)).toBe(KEY.TEST.TPUB)
  })
  test("conversion of testnet keys to mainnet keys", () => {
    expect(convertToXPUB(KEY.TEST.TPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToXPUB(KEY.TEST.UPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToXPUB(KEY.TEST.VPUB, NETWORKS.MAINNET)).toBe(KEY.MAIN.XPUB)
  })
})
