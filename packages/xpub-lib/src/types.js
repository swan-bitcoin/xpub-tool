/**
 * This module exports constants related to extended public key types.
 *
 * @module types
 */

/**
 * Extended public key type, which is also the prefix of the extended public
 * key in question.
 *
 * @constant
 * @enum {string}
 */
const TYPE = {
  /** xpub... (BIP 44, P2PKH, mainnet) */
  XPUB: "xpub",

  /** ypub... (BIP 49, P2WPKH-P2SH, mainnet) */
  YPUB: "ypub",

  /** zpub... (BIP 84, P2WPKH, mainnet) */
  ZPUB: "zpub",

  /** tpub... (BIP 44, P2PKH, testnet) */
  TPUB: "tpub",

  /** upub... (BIP 49, P2WPKH-P2SH, testnet) */
  UPUB: "upub",

  /** vpub... (BIP 84, P2WPKH, testnet) */
  VPUB: "vpub",
}

export { TYPE }
