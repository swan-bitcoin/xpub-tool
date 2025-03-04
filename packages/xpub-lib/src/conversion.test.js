import { Network } from "@caravan/bitcoin"
import { KEY } from "../test/fixtures"

import { convertToXPUB } from "./conversion"

describe("convertToXPUB", () => {
  test("no conversion if none is required", () => {
    expect(convertToXPUB(KEY.MAIN.XPUB, Network.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToXPUB(KEY.TEST.TPUB, Network.TESTNET)).toBe(KEY.TEST.TPUB)
  })
  test("conversion of mainnet keys", () => {
    expect(convertToXPUB(KEY.MAIN.YPUB, Network.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToXPUB(KEY.MAIN.ZPUB, Network.MAINNET)).toBe(KEY.MAIN.XPUB)
  })
  test("conversion of testnet keys", () => {
    expect(convertToXPUB(KEY.TEST.UPUB, Network.TESTNET)).toBe(KEY.TEST.TPUB)
    expect(convertToXPUB(KEY.TEST.VPUB, Network.TESTNET)).toBe(KEY.TEST.TPUB)
  })
  test("conversion of mainnet keys to testnet keys", () => {
    expect(convertToXPUB(KEY.MAIN.XPUB, Network.TESTNET)).toBe(KEY.TEST.TPUB)
    expect(convertToXPUB(KEY.MAIN.YPUB, Network.TESTNET)).toBe(KEY.TEST.TPUB)
    expect(convertToXPUB(KEY.MAIN.ZPUB, Network.TESTNET)).toBe(KEY.TEST.TPUB)
  })
  test("conversion of testnet keys to mainnet keys", () => {
    expect(convertToXPUB(KEY.TEST.TPUB, Network.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToXPUB(KEY.TEST.UPUB, Network.MAINNET)).toBe(KEY.MAIN.XPUB)
    expect(convertToXPUB(KEY.TEST.VPUB, Network.MAINNET)).toBe(KEY.MAIN.XPUB)
  })
})
