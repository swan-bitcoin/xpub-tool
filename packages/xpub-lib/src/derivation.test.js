import { NETWORKS } from "unchained-bitcoin"
import { KEY, KEYS, WASABI, SAMOURAI } from "../test/fixtures"
import { Purpose } from "./purpose"
import { addressFromExtPubKey, addressesFromExtPubKey } from "./derivation"

describe("addressFromExtPubKey() with invalid xpubs", () => {
  test("address generation from invalid xpub fails", () => {
    expect(addressFromExtPubKey({ extPubKey: "" })).toBeFalsy()
    expect(addressFromExtPubKey({ extPubKey: "xpub123" })).toBeFalsy()
  })
  test("address generation with invalid parameters fails", () => {
    expect(
      addressFromExtPubKey({ extPubKey: KEY.TEST.TPUB, accountNumber: -1 })
    ).toBeFalsy()
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.TPUB,
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
    expect(
      addressFromExtPubKey({ extPubKey: KEY.TEST.TPUB, purpose: "99" })
    ).toBeFalsy()
  })
})

describe("addressFromExtPubKey(MAINNET)", () => {
  // BIP 44
  test("P2PKH address generation from xpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.XPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.LEGACY)
  })
  test("P2PKH address generation from ypub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.YPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.LEGACY)
  })
  test("P2PKH address generation from zpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.ZPUB,
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
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.XPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.SEGWIT)
  })
  test("P2SH address generation from ypub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.YPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.SEGWIT)
  })
  test("P2SH address generation from zpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.ZPUB,
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
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.XPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.BECH32)
  })
  test("P2WPKH address generation from ypub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.YPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.BECH32)
  })
  test("P2WPKH address generation from zpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.ZPUB,
        accountNumber: 0,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.BECH32)
  })
})

describe("addressFromExtPubKey(TESTNET)", () => {
  // BIP 44
  test("P2PKH address generation from tpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.TPUB,
        purpose: Purpose.P2PKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.LEGACY)
  })
  test("P2PKH address generation from upub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.UPUB,
        purpose: Purpose.P2PKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.LEGACY)
  })
  test("P2PKH address generation from vpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.VPUB,
        purpose: Purpose.P2PKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.LEGACY)
  })

  // BIP 49
  test("P2SH address generation from tpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.TPUB,
        purpose: Purpose.P2SH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.SEGWIT)
  })
  test("P2SH address generation from upub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.UPUB,
        purpose: Purpose.P2SH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.SEGWIT)
  })
  test("P2SH address generation from vpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.VPUB,
        purpose: Purpose.P2SH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.SEGWIT)
  })

  // BIP 84
  test("P2WPKH address generation from tpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.TPUB,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.BECH32)
  })
  test("P2WPKH address generation from upub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.UPUB,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.BECH32)
  })
  test("P2WPKH address generation from vpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.VPUB,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.BECH32)
  })
})

describe("addressFromExtPubKey", () => {
  test("forbid testnet address generation from mainnet key", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEYS.MAIN.XPUB[0],
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
    expect(
      addressFromExtPubKey({
        extPubKey: KEYS.MAIN.YPUB[0],
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
    expect(
      addressFromExtPubKey({
        extPubKey: KEYS.MAIN.ZPUB[0],
        network: NETWORKS.TESTNET,
      })
    ).toBeFalsy()
  })
  test("forbid mainnet address generation from testnet key", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEYS.TEST.TPUB[0],
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
    expect(
      addressFromExtPubKey({
        extPubKey: KEYS.TEST.UPUB[0],
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
    expect(
      addressFromExtPubKey({
        extPubKey: KEYS.TEST.VPUB[0],
        network: NETWORKS.MAINNET,
      })
    ).toBeFalsy()
  })
})

describe("addressesFromExtPubKey", () => {
  test("default address generation from xpub on mainnet", () => {
    expect(
      addressesFromExtPubKey({
        extPubKey: WASABI.XPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(WASABI.ADDRESSES)
  })
  test("default address generation from ypub on mainnet", () => {
    expect(
      addressesFromExtPubKey({
        extPubKey: WASABI.YPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(WASABI.ADDRESSES)
  })
  test("default address generation from zpub on mainnet", () => {
    expect(
      addressesFromExtPubKey({
        extPubKey: WASABI.ZPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(WASABI.ADDRESSES)
    expect(
      addressesFromExtPubKey({
        extPubKey: SAMOURAI.ZPUB,
        addressCount: 3,
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)
    ).toStrictEqual(SAMOURAI.ADDRESSES)
    expect(
      addressesFromExtPubKey({
        extPubKey: SAMOURAI.ZPUB,
        addressCount: 20, // generate 20 addresses
        network: NETWORKS.MAINNET,
      }).map(obj => obj.address)[19] // pick nr. 20 and compare
    ).toEqual("bc1qrkv7s6enp5n7nnz97g2em2q4jefcmt9208syg0")
  })
})
