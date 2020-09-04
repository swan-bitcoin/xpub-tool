// Purpose defines the address type
const Purpose = {
  P2PKH: "44", // 1...
  P2SH: "49", // 3...
  P2WPKH: "84", // bc1...
}

// Human-readable account names as used by wallets
export const AccountTypeName = {
  [Purpose.P2PKH]: "Legacy", // 1addresses
  [Purpose.P2SH]: "SegWit", // 3addresses, SegWit = default
  [Purpose.P2WPKH]: "Native SegWit", // bc1addresses
}

export default Purpose
