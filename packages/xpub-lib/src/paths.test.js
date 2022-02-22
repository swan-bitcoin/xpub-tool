import { NETWORKS } from "unchained-bitcoin"
import {
  accountDerivationPath,
  fullDerivationPath,
  partialKeyDerivationPath,
  humanReadableDerivationPath,
} from "./paths"
import { KEY, ACCOUNT21 } from "../test/fixtures"
import { Purpose } from "./purpose"

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
        convertedExtPubKey: KEY.TEST.TPUB,
        purpose: Purpose.P2PKH,
        keyIndex: 0,
      })
    ).toBe("m/44'/1'/0'/0/0")
    expect(
      fullDerivationPath({
        convertedExtPubKey: ACCOUNT21.TEST.TPUB,
        purpose: Purpose.P2PKH,
        keyIndex: 1337,
      })
    ).toBe("m/44'/1'/21'/0/1337")
    expect(
      fullDerivationPath({
        convertedExtPubKey: KEY.TEST.TPUB,
        purpose: Purpose.P2PKH,
        change: 1,
        keyIndex: 0,
      })
    ).toBe("m/44'/1'/0'/1/0")
  })
  test("full mainnet derivation paths", () => {
    expect(
      fullDerivationPath({
        convertedExtPubKey: KEY.MAIN.XPUB,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
        keyIndex: 0,
      })
    ).toBe("m/44'/0'/0'/0/0")
    expect(
      fullDerivationPath({
        convertedExtPubKey: ACCOUNT21.MAIN.XPUB,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
        keyIndex: 1337,
      })
    ).toBe("m/44'/0'/21'/0/1337")
    expect(
      fullDerivationPath({
        convertedExtPubKey: KEY.MAIN.XPUB,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
        change: 1,
        keyIndex: 0,
      })
    ).toBe("m/44'/0'/0'/1/0")
  })
})

describe("partialKeyDerivationPath", () => {
  test("partial key derivation paths", () => {
    expect(
      partialKeyDerivationPath({
        change: 0,
        keyIndex: 0,
      })
    ).toBe("0/0")
    expect(
      partialKeyDerivationPath({
        change: 1,
        keyIndex: 0,
      })
    ).toBe("1/0")
  })
  test("valid change index", () => {
    expect(
      partialKeyDerivationPath({
        change: 0,
      })
    ).toBeTruthy()
    expect(
      partialKeyDerivationPath({
        change: 1,
      })
    ).toBeTruthy()
  })
  test("invalid change index", () => {
    expect(
      partialKeyDerivationPath({
        change: 21,
      })
    ).toBeFalsy()
    expect(
      partialKeyDerivationPath({
        change: 1337,
      })
    ).toBeFalsy()
    expect(
      partialKeyDerivationPath({
        change: 2147483647,
      })
    ).toBeFalsy()
    expect(
      partialKeyDerivationPath({
        change: -1,
      })
    ).toBeFalsy()
    expect(
      partialKeyDerivationPath({
        change: 2147483648,
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
