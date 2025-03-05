/**
 * This module exports purpose constants as defined in BIPs 44/49/84/86 and
 * human-readable account-type names.
 *
 * @module purpose
 */

/**
 * Derivation purpose as defined in BIP 44.
 *
 * @constant
 * @enum {string}
 */
const Purpose = {
  /** BIP 44: Pay To Pubkey Hash (addresses starting with 1) */
  P2PKH: "44", // 1...
  /** BIP 49: Pay To Witness Pubkey Hash nested in Pay To Script Hash (addresses starting with 3) */
  P2SH: "49", // 3...
  /** BIP 84: Pay To Witness Pubkey Hash (addresses starting with bc1q) */
  P2WPKH: "84", // bc1q...
  /** BIP 86: Pay-to-Taproot (P2TR) (addresses starting with bc1p) */
  P2TR: "86", // bc1p...
}

/**
 * Human-readable account names
 *
 * @constant
 * @enum {string}
 */
const AccountTypeName = {
  /** "Legacy" (BIP 44, addresses starting with 1) */
  [Purpose.P2PKH]: "Legacy",
  /** "SegWit" (BIP 49, addresses starting with 3) */
  [Purpose.P2SH]: "SegWit",
  /** "Native SegWit" (BIP 84, addresses starting with bc1q) */
  [Purpose.P2WPKH]: "Native SegWit", // bc1q addresses
    /** BIP 86: Pay-to-Taproot (P2TR) (addresses starting with bc1p) */
  [Purpose.P2TR]: "Pay-to-Taproot (P2TR)", // bc1p addresses
}

export { Purpose, AccountTypeName }
