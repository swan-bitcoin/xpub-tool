import { humanReadableDerivationPath } from "./paths"

describe("humanReadableDerivationPath", () => {
  test("Legacy", () => {
    expect(humanReadableDerivationPath({ bip32Path: "m/44'/0'/0'/0/1" })).toBe(
      "Account #1 (Legacy)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/44'/0'/1'/0/1" })).toBe(
      "Account #2 (Legacy)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/44'/0'/2'/0/1" })).toBe(
      "Account #3 (Legacy)"
    )
  })
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
  test("Native SegWit", () => {
    expect(humanReadableDerivationPath({ bip32Path: "m/84'/0'/0'/0/1" })).toBe(
      "Account #1 (Native SegWit)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/84'/0'/1'/0/1" })).toBe(
      "Account #2 (Native SegWit)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/84'/0'/2'/0/1" })).toBe(
      "Account #3 (Native SegWit)"
    )
  })
})
