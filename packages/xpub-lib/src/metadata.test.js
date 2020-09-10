import { KEYS } from "../test/fixtures"
import { getXpubType } from "./metadata"

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
