import { NETWORKS } from "unchained-bitcoin"
import { KEY, KEYS, WASABI, SAMOURAI } from "../test/fixtures"
import { Purpose } from "./purpose"

import { addressFromXpub, addressesFromXpub } from "./derivation"

describe("addressFromXpub(MAINNET)", () => {
  // BIP 44
  test("P2PKH address generation from xpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.XPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.LEGACY)
  })
  test("P2PKH address generation from ypub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.YPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.LEGACY)
  })
  test("P2PKH address generation from zpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.ZPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.LEGACY)
  })

  // BIP 49
  test("P2SH address generation from xpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.XPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.SEGWIT)
  })
  test("P2SH address generation from ypub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.YPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.SEGWIT)
  })
  test("P2SH address generation from zpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.ZPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.SEGWIT)
  })

  // BIP 84
  test("P2WPKH address generation from xpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.XPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.BECH32)
  })
  test("P2WPKH address generation from ypub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.YPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.BECH32)
  })
  test("P2WPKH address generation from zpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.MAIN.ZPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.BECH32)
  })
})

describe("addressFromXpub(TESTNET)", () => {
  // BIP 44
  test("P2PKH address generation from tpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.TEST.TPUB,
        purpose: Purpose.P2PKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.LEGACY)
  })
  test("P2PKH address generation from upub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.TEST.UPUB,
        purpose: Purpose.P2PKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.LEGACY)
  })
  test("P2PKH address generation from vpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.TEST.VPUB,
        purpose: Purpose.P2PKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.LEGACY)
  })

  // BIP 49
  test("P2SH address generation from tpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.TEST.TPUB,
        purpose: Purpose.P2SH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.SEGWIT)
  })
  test("P2SH address generation from upub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.TEST.UPUB,
        purpose: Purpose.P2SH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.SEGWIT)
  })
  test("P2SH address generation from vpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.TEST.VPUB,
        purpose: Purpose.P2SH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.SEGWIT)
  })

  // BIP 84
  test("P2WPKH address generation from tpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.TEST.TPUB,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.BECH32)
  })
  test("P2WPKH address generation from upub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.TEST.UPUB,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.BECH32)
  })
  test("P2WPKH address generation from vpub", () => {
    expect(
      addressFromXpub({
        xpub: KEY.TEST.VPUB,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.BECH32)
  })
})

describe("addressFromXpub", () => {
  test("forbid testnet address generation from mainnet key", () => {
    expect(
      addressFromXpub({
        xpub: KEYS.MAIN.XPUB[0],
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: KEYS.MAIN.YPUB[0],
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: KEYS.MAIN.ZPUB[0],
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
  })
  test("forbid mainnet address generation from testnet key", () => {
    expect(
      addressFromXpub({
        xpub: KEYS.TEST.TPUB[0],
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: KEYS.TEST.UPUB[0],
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
    expect(
      addressFromXpub({
        xpub: KEYS.TEST.VPUB[0],
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
  })
})

describe("addressesFromXpub", () => {
  test("default address generation from xpub on mainnet", () => {
    expect(
      addressesFromXpub({
        xpub: WASABI.XPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(WASABI.ADDRESSES)
  })
  test("default address generation from ypub on mainnet", () => {
    expect(
      addressesFromXpub({
        xpub: WASABI.YPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(WASABI.ADDRESSES)
  })
  test("default address generation from zpub on mainnet", () => {
    expect(
      addressesFromXpub({
        xpub: WASABI.ZPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(WASABI.ADDRESSES)
    expect(
      addressesFromXpub({
        xpub: SAMOURAI.ZPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(SAMOURAI.ADDRESSES)
    expect(
      addressesFromXpub({
        xpub: SAMOURAI.ZPUB,
        addressCount: 20, // generate 20 addresses
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)[19] // pick nr. 20 and compare
    ).toEqual("bc1qrkv7s6enp5n7nnz97g2em2q4jefcmt9208syg0")
  })
})
