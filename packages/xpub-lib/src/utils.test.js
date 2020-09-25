import { KEY } from "../test/fixtures"
import { segment } from "./utils"

describe("segment", () => {
  test("address segmentation", () => {
    // bc1qdx0pd4h65d7mekkhk7n6jwzfwgqath7s0e368g
    // -> bc1qdx 0pd4h65d7mekkhk7n6jwzfwgqath7s 0e368g
    const result = ["bc1qdx", "0pd4h65d7mekkhk7n6jwzfwgqath7s", "0e368g"]
    expect(segment(KEY.MAIN.BECH32)[0].length).toBe(6)
    expect(segment(KEY.MAIN.BECH32)[2].length).toBe(6)
    expect(segment(KEY.MAIN.BECH32)).toStrictEqual(result)
  })
})