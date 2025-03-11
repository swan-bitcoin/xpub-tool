import { Network } from "@caravan/bitcoin"
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
    expect(isValidPathSegment("86'")).toBeTruthy()

    // not hardened
    expect(isValidPathSegment("m")).toBeTruthy()
    expect(isValidPathSegment("0")).toBeTruthy()
    expect(isValidPathSegment("1")).toBeTruthy()
    expect(isValidPathSegment("44")).toBeTruthy()
    expect(isValidPathSegment("49")).toBeTruthy()
    expect(isValidPathSegment("84")).toBeTruthy()
    expect(isValidPathSegment("86")).toBeTruthy()
  })
})

describe("isValidExtPubKey", () => {
  test("invalid keys are invalid on mainnet", () => {
    expect(isValidExtPubKey("", Network.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey("xpub...", Network.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey("ypub...", Network.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey("zpub...", Network.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey("tpub...", Network.TESTNET)).toBeFalsy()
    expect(isValidExtPubKey("upub...", Network.TESTNET)).toBeFalsy()
    expect(isValidExtPubKey("vpub...", Network.TESTNET)).toBeFalsy()
    expect(
      isValidExtPubKey(
        "ExtPubKey6D7NqpxWckGwCHhpXoL4pH38m5xVty62KY2wUh6JoyDCofwHciDRoQ3xm7WAg2ffpHaC6X4bEociYq81niyNUGhCxEs6fDFAd1LPbEmzcAm",
        Network.MAINNET
      )
    ).toBeFalsy()
    expect(
      isValidExtPubKey(
        "xpub6BfKpqjTwvH21wJGWEfxLppb8sU7C6FJge2kWb9315oP4ZVqCXG29cdUtkyu7YQhHyfA5nt63nzcNZHYmqXYHDxYo8mm1Xq1dAC7YtodwUr",
        Network.MAINNET
      )
    ).toBeFalsy()
  })
  test("mainnet keys (extPubKey/ypub/zpub) are invalid on testnet", () => {
    expect(isValidExtPubKey(KEYS.MAIN.XPUB[0], Network.TESTNET)).toBeFalsy()
    expect(isValidExtPubKey(KEYS.MAIN.YPUB[0], Network.TESTNET)).toBeFalsy()
    expect(isValidExtPubKey(KEYS.MAIN.ZPUB[0], Network.TESTNET)).toBeFalsy()
  })
  test("testnet keys (tpub/upub/vpub) are invalid on mainnet", () => {
    expect(isValidExtPubKey(KEYS.TEST.TPUB[0], Network.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey(KEYS.TEST.UPUB[0], Network.MAINNET)).toBeFalsy()
    expect(isValidExtPubKey(KEYS.TEST.VPUB[0], Network.MAINNET)).toBeFalsy()
  })

  // BIP 32 and BIP 44: XPUB & TPUB
  test("mainnet xpub is valid", () => {
    expect(isValidExtPubKey(KEYS.MAIN.XPUB[0], Network.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.XPUB[1], Network.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.XPUB[2], Network.MAINNET)).toBeTruthy()
  })
  test("testnet xpub (tpub) is valid", () => {
    expect(isValidExtPubKey(KEYS.TEST.TPUB[0], Network.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.TPUB[1], Network.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.TPUB[2], Network.TESTNET)).toBeTruthy()
  })

  // BIP 49: YPUB & UPUB
  test("mainnet ypub is valid", () => {
    expect(isValidExtPubKey(KEYS.MAIN.YPUB[0], Network.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.YPUB[1], Network.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.YPUB[2], Network.MAINNET)).toBeTruthy()
  })
  test("testnet ypub (upub) is valid", () => {
    expect(isValidExtPubKey(KEYS.TEST.UPUB[0], Network.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.UPUB[1], Network.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.UPUB[2], Network.TESTNET)).toBeTruthy()
  })

  // BIP 84: ZPUB & VPUB
  test("mainnet zpub is valid", () => {
    expect(isValidExtPubKey(KEYS.MAIN.ZPUB[0], Network.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.ZPUB[1], Network.MAINNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.MAIN.ZPUB[2], Network.MAINNET)).toBeTruthy()
  })
  test("testnet zpub (vpub) is valid", () => {
    expect(isValidExtPubKey(KEYS.TEST.VPUB[0], Network.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.VPUB[1], Network.TESTNET)).toBeTruthy()
    expect(isValidExtPubKey(KEYS.TEST.VPUB[2], Network.TESTNET)).toBeTruthy()
  })
})

describe("isValidAddress", () => {
  // MAINNET
  test("valid legacy (P2PKH) address on mainnet", () => {
    expect(isValidAddress(KEY.MAIN.LEGACY, Network.MAINNET)).toBeTruthy()
  })
  test("valid segwit (P2SH) address on mainnet", () => {
    expect(isValidAddress(KEY.MAIN.SEGWIT, Network.MAINNET)).toBeTruthy()
  })
  test("valid bech32 v0 (P2WPKH) address on mainnet", () => {
    expect(isValidAddress(KEY.MAIN.BECH32, Network.MAINNET)).toBeTruthy()
  })
  test("valid bech32 v1 (P2TR) address on mainnet", () => {
    expect(isValidAddress(KEY.MAIN.TAPROOT, Network.MAINNET)).toBeTruthy()
  })

  // TESTNET
  test("valid legacy (P2PKH) address on testnet", () => {
    expect(isValidAddress(KEY.TEST.LEGACY, Network.TESTNET)).toBeTruthy()
  })
  test("valid segwit (P2SH) address on testnet", () => {
    expect(isValidAddress(KEY.TEST.SEGWIT, Network.TESTNET)).toBeTruthy()
  })
  test("valid bech32 v0 (P2WPKH) address on testnet", () => {
    expect(isValidAddress(KEY.TEST.BECH32, Network.TESTNET)).toBeTruthy()
  })
  test("valid bech32 v1 (P2TR) address on testnet", () => {
    expect(isValidAddress(KEY.TEST.TAPROOT, Network.TESTNET)).toBeTruthy()
  })

  // INVALID: NETWORK MISMATCH
  test("invalid legacy (P2PKH) address (wrong network)", () => {
    expect(isValidAddress(KEY.TEST.LEGACY, Network.MAINNET)).toBeFalsy()
    expect(isValidAddress(KEY.MAIN.LEGACY, Network.TESTNET)).toBeFalsy()
  })
  test("invalid segwit (P2SH) address (wrong network)", () => {
    expect(isValidAddress(KEY.TEST.SEGWIT, Network.MAINNET)).toBeFalsy()
    expect(isValidAddress(KEY.MAIN.SEGWIT, Network.TESTNET)).toBeFalsy()
  })
  test("invalid bech32 (P2WPKH) address (wrong network)", () => {
    expect(isValidAddress(KEY.TEST.BECH32, Network.MAINNET)).toBeFalsy()
    expect(isValidAddress(KEY.MAIN.BECH32, Network.TESTNET)).toBeFalsy()
  })

  // INVALID: BAD ADDRESS
  test("invalid addresses on mainnet", () => {
    expect(isValidAddress("", Network.MAINNET)).toBeFalsy()
    expect(isValidAddress(" ", Network.MAINNET)).toBeFalsy()
    expect(isValidAddress("1AdT...", Network.MAINNET)).toBeFalsy()
    expect(isValidAddress("3JDv...", Network.MAINNET)).toBeFalsy()
    expect(isValidAddress("bc1q...", Network.MAINNET)).toBeFalsy()
    expect(isValidAddress("bc1p...", Network.MAINNET)).toBeFalsy()
    expect(
      isValidAddress("1AdTLNfqiQtQ7yRNoZDEFTE9kSri2jrRVd", Network.MAINNET)
    ).toBeFalsy()
    expect(
      isValidAddress("3JDvonJcuQ7yQQQJh1tFLV74uRZUP6LgvF", Network.MAINNET)
    ).toBeFalsy()
    expect(
      isValidAddress(
        "bc1qdX0pd4h65d7mekkhk7n6jwzfwgqath7s0e368g",
        Network.MAINNET
      )
    ).toBeFalsy()
    expect(
      isValidAddress(KEY.MAIN.TAPROOT.concat("abcd"), Network.MAINNET)
    ).toBeFalsy()
    expect(
      isValidAddress(
        KEY.MAIN.TAPROOT.substring(0, KEY.TEST.TAPROOT.length - 1),
        Network.MAINNET
      )
    ).toBeFalsy()
    expect(isValidAddress(KEY.TEST.TAPROOT, Network.MAINNET)).toBeFalsy()
  })
  test("invalid addresses on TESTNET", () => {
    expect(isValidAddress("", Network.TESTNET)).toBeFalsy()
    expect(isValidAddress(" ", Network.TESTNET)).toBeFalsy()
    expect(isValidAddress("1AdT...", Network.TESTNET)).toBeFalsy()
    expect(isValidAddress("3JDv...", Network.TESTNET)).toBeFalsy()
    expect(isValidAddress("bc1q...", Network.TESTNET)).toBeFalsy()
    expect(isValidAddress("tb1p...", Network.TESTNET)).toBeFalsy()
    expect(
      isValidAddress("mq9QdRkpXSKeu5tzX8Bc5NSucSTQxzpa8G", Network.TESTNET)
    ).toBeFalsy()
    expect(
      isValidAddress("2N9mhsXEeWrdKcC3rN9W7xS6L7mme9kJrVe", Network.TESTNET)
    ).toBeFalsy()
    expect(
      isValidAddress(
        "tb1qdx0pd4h65d7mekkhk7n6Jwzfwgqath7s9l2fum",
        Network.TESTNET
      )
    ).toBeFalsy()
    expect(
      isValidAddress(KEY.TEST.TAPROOT.concat("abcd"), Network.TESTNET)
    ).toBeFalsy()
    expect(
      isValidAddress(
        KEY.TEST.TAPROOT.substring(0, KEY.TEST.TAPROOT.length - 1),
        Network.TESTNET
      )
    ).toBeFalsy()
    expect(isValidAddress(KEY.MAIN.TAPROOT, Network.TESTNET)).toBeFalsy()
  })
})
