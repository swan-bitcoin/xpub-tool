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
      addressFromExtPubKey({ extPubKey: KEY.TEST.TPUB, keyIndex: -1 })
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
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.LEGACY)
  })
  test("P2PKH change address generation from xpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.XPUB,
        change: 1,
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.CHANGE.LEGACY)
  })
  test("P2PKH change address generation from ypub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.YPUB,
        change: 1,
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.CHANGE.LEGACY)
  })
  test("P2PKH change address generation from zpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.ZPUB,
        change: 1,
        keyIndex: 0,
        purpose: Purpose.P2PKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.CHANGE.LEGACY)
  })

  // BIP 49
  test("P2SH address generation from xpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.XPUB,
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
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.SEGWIT)
  })
  test("P2SH change address generation from xpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.XPUB,
        change: 1,
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.CHANGE.SEGWIT)
  })
  test("P2SH change address generation from ypub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.YPUB,
        change: 1,
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.CHANGE.SEGWIT)
  })
  test("P2SH change address generation from zpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.ZPUB,
        change: 1,
        keyIndex: 0,
        purpose: Purpose.P2SH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.CHANGE.SEGWIT)
  })

  // BIP 84
  test("P2WPKH address generation from xpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.XPUB,
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
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.BECH32)
  })
  test("P2WPKH change address generation from xpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.XPUB,
        change: 1,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.CHANGE.BECH32)
  })
  test("P2WPKH change address generation from ypub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.YPUB,
        change: 1,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.CHANGE.BECH32)
  })
  test("P2WPKH change address generation from zpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.ZPUB,
        change: 1,
        keyIndex: 0,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.MAINNET,
      }).address
    ).toBe(KEY.MAIN.CHANGE.BECH32)
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
  test("P2PKH change address generation from tpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.TPUB,
        change: 1,
        purpose: Purpose.P2PKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.CHANGE.LEGACY)
  })
  test("P2PKH change address generation from upub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.UPUB,
        change: 1,
        purpose: Purpose.P2PKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.CHANGE.LEGACY)
  })
  test("P2PKH change address generation from vpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.VPUB,
        change: 1,
        purpose: Purpose.P2PKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.CHANGE.LEGACY)
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
  test("P2SH change address generation from tpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.TPUB,
        change: 1,
        purpose: Purpose.P2SH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.CHANGE.SEGWIT)
  })
  test("P2SH change address generation from upub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.UPUB,
        change: 1,
        purpose: Purpose.P2SH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.CHANGE.SEGWIT)
  })
  test("P2SH change address generation from vpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.VPUB,
        change: 1,
        purpose: Purpose.P2SH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.CHANGE.SEGWIT)
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
  test("P2WPKH change address generation from tpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.TPUB,
        change: 1,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.CHANGE.BECH32)
  })
  test("P2WPKH change address generation from upub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.UPUB,
        change: 1,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.CHANGE.BECH32)
  })
  test("P2WPKH change address generation from vpub", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.TEST.VPUB,
        change: 1,
        purpose: Purpose.P2WPKH,
        network: NETWORKS.TESTNET,
      }).address
    ).toBe(KEY.TEST.CHANGE.BECH32)
  })
})

describe("addressFromExtPubKey", () => {
  test("default address generation from tpub (default = testnet)", () => {
    expect(addressFromExtPubKey({ extPubKey: KEY.TEST.TPUB }).address).toBe(
      KEY.TEST.BECH32
    )
  })
  test("default address generation from xpub on mainnet", () => {
    expect(
      addressFromExtPubKey({
        extPubKey: KEY.MAIN.XPUB,
        network: NETWORKS.MAINNET, // or "mainnet"
      }).address
    ).toBe(KEY.MAIN.BECH32)
  })

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
  test("default address generation from vpub on testnet", () => {
    expect(
      addressesFromExtPubKey({
        extPubKey: KEY.TEST.VPUB,
        addressCount: 3,
      }).length
    ).toEqual(3)
  })
  test("offset address generation from vpub on testnet", () => {
    const expected = [KEYS.TEST.VPUB[1], KEYS.TEST.VPUB[2]]
    const addresses = addressesFromExtPubKey({
      extPubKey: KEY.TEST.VPUB,
      addressCount: 2,
      addressStartIndex: 1,
    })
    expect(addresses.length).toBe(expected.length)
  })
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
  test("offset address generation from zpub on mainnet", () => {
    // Wasabi
    const expectedWasabi = [WASABI.ADDRESSES[1], WASABI.ADDRESSES[2]]
    const addressesWasabi = addressesFromExtPubKey({
      extPubKey: WASABI.ZPUB,
      addressStartIndex: 1,
      addressCount: 2,
      network: NETWORKS.MAINNET,
    })
    expect(addressesWasabi.length).toBe(expectedWasabi.length)
    expect(addressesWasabi.map(obj => obj.address)).toEqual(expectedWasabi)

    // Samourai
    const expectedSamourai = [
      "bc1qmderpmzcft4csyq0dnned2sw69np6nljes4we3",
      "bc1q0lw3ae3uujqcyk3wd40acf0q0wyzza9tysucwg",
      "bc1qqnmqt9zkawf8x9j3dl9pqlhlw5gzcuj04ujjw3",
    ]
    const addressesSamourai = addressesFromExtPubKey({
      extPubKey: SAMOURAI.ZPUB,
      addressStartIndex: 16,
      addressCount: 3,
      network: NETWORKS.MAINNET,
    })
    expect(addressesSamourai.length).toBe(expectedSamourai.length)
    expect(addressesSamourai.map(obj => obj.address)).toEqual(expectedSamourai)
  })
})
