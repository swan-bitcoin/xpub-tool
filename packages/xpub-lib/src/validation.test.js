import { NETWORKS } from "unchained-bitcoin"
import { KEY, KEYS } from "../test/fixtures"
import {
  isValidExtPubKey,
  isValidAddress,
  isValidIndex,
  isValidChainIndex,
  isValidPathSegment,
} from "./validation"

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

describe("isValidChainIndex", () => {
  test("valid chain indices", () => {
    expect(isValidChainIndex("0")).toBeTruthy()
    expect(isValidChainIndex("1")).toBeTruthy()

    expect(isValidChainIndex(0)).toBeTruthy()
    expect(isValidChainIndex(1)).toBeTruthy()
  })
  test("invalid chain indices", () => {
    expect(isValidChainIndex("21")).toBeFalsy()
    expect(isValidChainIndex("1337")).toBeFalsy()
    expect(isValidChainIndex("2147483647")).toBeFalsy()
    expect(isValidChainIndex("-1")).toBeFalsy()
    expect(isValidChainIndex("2147483648")).toBeFalsy()
    expect(isValidChainIndex("a")).toBeFalsy()
    expect(isValidChainIndex("/")).toBeFalsy()

    expect(isValidChainIndex(21)).toBeFalsy()
    expect(isValidChainIndex(1337)).toBeFalsy()
    expect(isValidChainIndex(2147483647)).toBeFalsy()
    expect(isValidChainIndex(-1)).toBeFalsy()
    expect(isValidChainIndex(2147483648)).toBeFalsy()
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

describe("isValidExtPubKey", () => {
  test("invalid keys are invalid on mainnet", () => {
    expect(isValidExtPubKey("", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey("xpub...", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey("ypub...", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey("zpub...", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey("tpub...", NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidExtPubKey("upub...", NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidExtPubKey("vpub...", NETWORKS.TESTNET)).toBeFalsy()
    expect(
      isValidExtPubKey(
        "ExtPubKey6D7NqpxWckGwCHhpXoL4pH38m5xVty62KY2wUh6JoyDCofwHciDRoQ3xm7WAg2ffpHaC6X4bEociYq81niyNUGhCxEs6fDFAd1LPbEmzcAm",
        NETWORKS.MAINNET
      )
    ).toBeFalsy()
    expect(
      isValidExtPubKey(
        "xpub6BfKpqjTwvH21wJGWEfxLppb8sU7C6FJge2kWb9315oP4ZVqCXG29cdUtkyu7YQhHyfA5nt63nzcNZHYmqXYHDxYo8mm1Xq1dAC7YtodwUr",
        NETWORKS.MAINNET
      )
    ).toBeFalsy()
  })
  test("mainnet keys (extPubKey/ypub/zpub) are invalid on testnet", () => {
    expect(isValidExtPubKey(KEYS.MAIN.XPUB[0], NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidExtPubKey(KEYS.MAIN.YPUB[0], NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidExtPubKey(KEYS.MAIN.ZPUB[0], NETWORKS.TESTNET)).toBeFalsy()
  })
  test("testnet keys (tpub/upub/vpub) are invalid on mainnet", () => {
    expect(isValidExtPubKey(KEYS.TEST.TPUB[0], NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey(KEYS.TEST.UPUB[0], NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey(KEYS.TEST.VPUB[0], NETWORKS.MAINNET)).toBeFalsy()
  })

  // BIP 32 and BIP 44: XPUB & TPUB
  test("mainnet xpub is valid", () => {
    expect(isValidExtPubKey(KEYS.MAIN.XPUB[0], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.XPUB[1], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.XPUB[2], NETWORKS.MAINNET)).toBeTruthy()
  })
  test("testnet xpub (tpub) is valid", () => {
    expect(isValidExtPubKey(KEYS.TEST.TPUB[0], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.TPUB[1], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.TPUB[2], NETWORKS.TESTNET)).toBeTruthy()
  })

  // BIP 49: YPUB & UPUB
  test("mainnet ypub is valid", () => {
    expect(isValidExtPubKey(KEYS.MAIN.YPUB[0], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.YPUB[1], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.YPUB[2], NETWORKS.MAINNET)).toBeTruthy()
  })
  test("testnet ypub (upub) is valid", () => {
    expect(isValidExtPubKey(KEYS.TEST.UPUB[0], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.UPUB[1], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.UPUB[2], NETWORKS.TESTNET)).toBeTruthy()
  })

  // BIP 84: ZPUB & VPUB
  test("mainnet zpub is valid", () => {
    expect(isValidExtPubKey(KEYS.MAIN.ZPUB[0], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.ZPUB[1], NETWORKS.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.ZPUB[2], NETWORKS.MAINNET)).toBeTruthy()
  })
  test("testnet zpub (vpub) is valid", () => {
    expect(isValidExtPubKey(KEYS.TEST.VPUB[0], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.VPUB[1], NETWORKS.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.VPUB[2], NETWORKS.TESTNET)).toBeTruthy()
  })
})

describe("isValidAddress", () => {
  // MAINNET
  test("valid legacy (P2PKH) address on mainnet", () => {
    expect(isValidAddress(KEY.MAIN.LEGACY, NETWORKS.MAINNET)).toBeTruthy()
  })
  test("valid segwit (P2SH) address on mainnet", () => {
    expect(isValidAddress(KEY.MAIN.SEGWIT, NETWORKS.MAINNET)).toBeTruthy()
  })
  test("valid bech32 (P2WPKH) address on mainnet", () => {
    expect(isValidAddress(KEY.MAIN.BECH32, NETWORKS.MAINNET)).toBeTruthy()
  })

  // TESTNET
  test("valid legacy (P2PKH) address on testnet", () => {
    expect(isValidAddress(KEY.TEST.LEGACY, NETWORKS.TESTNET)).toBeTruthy()
  })
  test("valid segwit (P2SH) address on testnet", () => {
    expect(isValidAddress(KEY.TEST.SEGWIT, NETWORKS.TESTNET)).toBeTruthy()
  })
  test("valid bech32 (P2WPKH) address on testnet", () => {
    expect(isValidAddress(KEY.TEST.BECH32, NETWORKS.TESTNET)).toBeTruthy()
  })

  // INVALID: NETWORK MISMATCH
  test("invalid legacy (P2PKH) address (wrong network)", () => {
    expect(isValidAddress(KEY.TEST.LEGACY, NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidAddress(KEY.MAIN.LEGACY, NETWORKS.TESTNET)).toBeFalsy()
  })
  test("invalid segwit (P2SH) address (wrong network)", () => {
    expect(isValidAddress(KEY.TEST.SEGWIT, NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidAddress(KEY.MAIN.SEGWIT, NETWORKS.TESTNET)).toBeFalsy()
  })
  test("invalid bech32 (P2WPKH) address (wrong network)", () => {
    expect(isValidAddress(KEY.TEST.BECH32, NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidAddress(KEY.MAIN.BECH32, NETWORKS.TESTNET)).toBeFalsy()
  })

  // INVALID: BAD ADDRESS
  test("invalid addresses on mainnet", () => {
    expect(isValidAddress("", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidAddress(" ", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidAddress("1AdT...", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidAddress("3JDv...", NETWORKS.MAINNET)).toBeFalsy()
    expect(isValidAddress("bc1q...", NETWORKS.MAINNET)).toBeFalsy()
    expect(
      isValidAddress("1AdTLNfqiQtQ7yRNoZDEFTE9kSri2jrRVd", NETWORKS.MAINNET)
    ).toBeFalsy()
    expect(
      isValidAddress("3JDvonJcuQ7yQQQJh1tFLV74uRZUP6LgvF", NETWORKS.MAINNET)
    ).toBeFalsy()
    expect(
      isValidAddress(
        "bc1qdX0pd4h65d7mekkhk7n6jwzfwgqath7s0e368g",
        NETWORKS.MAINNET
      )
    ).toBeFalsy()
  })
  test("invalid addresses on TESTNET", () => {
    expect(isValidAddress("", NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidAddress(" ", NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidAddress("1AdT...", NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidAddress("3JDv...", NETWORKS.TESTNET)).toBeFalsy()
    expect(isValidAddress("bc1q...", NETWORKS.TESTNET)).toBeFalsy()
    expect(
      isValidAddress("mq9QdRkpXSKeu5tzX8Bc5NSucSTQxzpa8G", NETWORKS.TESTNET)
    ).toBeFalsy()
    expect(
      isValidAddress("2N9mhsXEeWrdKcC3rN9W7xS6L7mme9kJrVe", NETWORKS.TESTNET)
    ).toBeFalsy()
    expect(
      isValidAddress(
        "tb1qdx0pd4h65d7mekkhk7n6Jwzfwgqath7s9l2fum",
        NETWORKS.TESTNET
      )
    ).toBeFalsy()
  })
})
