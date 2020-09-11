import { NETWORKS } from "unchained-bitcoin"
import {
  accountDerivationPath,
  fullDerivationPath,
  partialKeyDerivationPath,
  humanReadableDerivationPath,
  isValidPathSegment,
  isValidIndex,
} from "./paths"
import { Purpose } from "./purpose"

describe("isValidIndex", () => {
  test("valid indices", () => {
    expect(isValidIndex("0")).toBeTruthy()
    expect(isValidIndex("1")).toBeTruthy()
    expect(isValidIndex("21")).toBeTruthy()
    expect(isValidIndex("1337")).toBeTruthy()
    expect(isValidIndex("2147483647")).toBeTruthy()

    expect(isValidIndex(0)).toBeTruthy()
    expect(isValidIndex(1)).toBeTruthy()
    expect(isValidIndex(21)).toBeTruthy()
    expect(isValidIndex(1337)).toBeTruthy()
    expect(isValidIndex(2147483647)).toBeTruthy()
  })
  test("invalid indices", () => {
    expect(isValidIndex("-1")).toBeFalsy()
    expect(isValidIndex("2147483648")).toBeFalsy()
    expect(isValidIndex("a")).toBeFalsy()
    expect(isValidIndex("/")).toBeFalsy()

    expect(isValidIndex(-1)).toBeFalsy()
    expect(isValidIndex(2147483648)).toBeFalsy()
  })
})

describe("isValidPathSegment", () => {
  test("valid path segments", () => {
    // hardened
    expect(isValidPathSegment("m'")).toBeTruthy()
    expect(isValidPathSegment("0'")).toBeTruthy()
    expect(isValidPathSegment("1'")).toBeTruthy()
    expect(isValidPathSegment("44'")).toBeTruthy()
    expect(isValidPathSegment("49'")).toBeTruthy()
    expect(isValidPathSegment("84'")).toBeTruthy()

    // not hardened
    expect(isValidPathSegment("m")).toBeTruthy()
    expect(isValidPathSegment("0")).toBeTruthy()
    expect(isValidPathSegment("1")).toBeTruthy()
    expect(isValidPathSegment("44")).toBeTruthy()
    expect(isValidPathSegment("49")).toBeTruthy()
    expect(isValidPathSegment("84")).toBeTruthy()
  })
})

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
  test("empty path", () => {
    expect(() => {
      humanReadableDerivationPath({ bip32Path: "" })
    }).toThrow()
  })
})

describe("accountDerivationPath", () => {
  test("testnet derivation paths", () => {
    expect(
      accountDerivationPath({ purpose: Purpose.P2PKH, accountNumber: 0 })
    ).toBe("m/44'/1'/0'")
    expect(
      accountDerivationPath({ purpose: Purpose.P2SH, accountNumber: 0 })
    ).toBe("m/49'/1'/0'")
    expect(
      accountDerivationPath({ purpose: Purpose.P2WPKH, accountNumber: 0 })
    ).toBe("m/84'/1'/0'")
    expect(
      accountDerivationPath({ purpose: Purpose.P2PKH, accountNumber: 1337 })
    ).toBe("m/44'/1'/1337'")
  })
  test("mainnet derivation paths", () => {
    expect(
      accountDerivationPath({
        purpose: Purpose.P2PKH,
        accountNumber: 0,
        network: NETWORKS.MAINNET,
      })
    ).toBe("m/44'/0'/0'")
    expect(
      accountDerivationPath({
        purpose: Purpose.P2SH,
        accountNumber: 0,
        network: NETWORKS.MAINNET,
      })
    ).toBe("m/49'/0'/0'")
    expect(
      accountDerivationPath({
        purpose: Purpose.P2WPKH,
        accountNumber: 0,
        network: NETWORKS.MAINNET,
      })
    ).toBe("m/84'/0'/0'")
    expect(
      accountDerivationPath({
        purpose: Purpose.P2WPKH,
        accountNumber: 21,
        network: NETWORKS.MAINNET,
      })
    ).toBe("m/84'/0'/21'")
  })
})

describe("fullDerivationPath", () => {
  test("full testnet derivation paths", () => {
    expect(
      fullDerivationPath({
        purpose: Purpose.P2PKH,
        accountNumber: 0,
        keyIndex: 0,
      })
    ).toBe("m/44'/1'/0'/0/0")
    expect(
      fullDerivationPath({
        purpose: Purpose.P2PKH,
        accountNumber: 21,
        keyIndex: 1337,
      })
    ).toBe("m/44'/1'/21'/0/1337")
  })
})

describe("partialKeyDerivationPath", () => {
  test("partial key derivation paths", () => {
    expect(
      partialKeyDerivationPath({
        accountNumber: 0,
        keyIndex: 0,
      })
    ).toBe("0/0")
  })
  test("valid account number", () => {
    expect(
      partialKeyDerivationPath({
        accountNumber: 0,
      })
    ).toBeTruthy()
    expect(
      partialKeyDerivationPath({
        accountNumber: 21,
      })
    ).toBeTruthy()
    expect(
      partialKeyDerivationPath({
        accountNumber: 1337,
      })
    ).toBeTruthy()
    expect(
      partialKeyDerivationPath({
        accountNumber: 2147483647,
      })
    ).toBeTruthy()
  })
  test("invalid account number", () => {
    expect(
      partialKeyDerivationPath({
        accountNumber: -1,
      })
    ).toBeFalsy()
    expect(
      partialKeyDerivationPath({
        accountNumber: 2147483648,
      })
    ).toBeFalsy()
  })
  test("invalid key index", () => {
    expect(
      partialKeyDerivationPath({
        keyIndex: -1,
      })
    ).toBeFalsy()
  })
})
