import { humanReadableDerivationPath } from "./paths"

describe("humanReadableDerivationPath", () => {
  test("SegWit", () => {
    expect(humanReadableDerivationPath({ bip32Path: "m/49'/0'/0'/0/1" })).toBe(
      "Account #1 (SegWit)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/49'/0'/1'/0/1" })).toBe(
      "Account #2 (SegWit)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/49'/0'/2'/0/1" })).toBe(
      "Account #3 (SegWit)"
    )
  })
})
