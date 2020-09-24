# Swan's Address Derivation Library

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A small JavaScript library that derives bitcoin addresses from extended public keys. Built upon
[unchained-bitcoin](https://github.com/unchained-capital/unchained-bitcoin)
and [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib).

The library supports derivation from `xpub`s, `zpub`s, and `ypub`s, as well as
legacy, SegWit, and native SegWit (bech32) address formats. Both Bitcoin
mainnet and testnet are supported. If no network is specified the library
defaults to testnet.

| BIP | Extended Public Key | Address Type | Address Format | Address Name           |
| --- | ------------------- | ------------ | -------------- | ---------------------- |
| 44  | `xpub...`           | P2PKH        | `1...`         | Legacy                 |
| 49  | `ypub...`           | P2WPKH-P2SH  | `3...`         | SegWit                 |
| 84  | `zpub...`           | P2WPKH       | `bc1...`       | Bech32 (Native SegWit) |

Note that the different extended public key formats are interchangeable and
not bound to address formats. Every address type can be generated from every
extended public key. The use of [output descriptors](https://bitcoin.stackexchange.com/questions/89261/why-does-importmulti-not-support-zpub-and-ypub/89281#89281)
should make this less confusing in the future.

The testnet equivalents are extended public keys starting with `tpub`, `upub`, and `vpub`.

## Example Usage

Use `addressFromExtPubKey` to derive single addresses. The following example
derives the first address of the first account from an `xpub` on mainnet.

```
const key = "xpub6EuV33a2DXxAhoJTRTnr8qnysu81AA4YHpLY6o8NiGkEJ8KADJ35T64eJsStWsmRf1xXkEANVjXFXnaUKbRtFwuSPCLfDdZwYNZToh4LBCd"

addressFromExtPubKey({ extPubKey: key, network: "mainnet" })

// {
//     path: "m/84'/0'/0'/0/0",
//     address: 'bc1qdx0pd4h65d7mekkhk7n6jwzfwgqath7s0e368g'
// }
```

Use `addressesFromExtPubKey` to derive multiple addresses. The following
example derives the first three addresses of the first account from a `vpub`
extended public key on testnet.

```
const key = "vpub5bExRiEBvAsD1CvDkkDbifbyXxq7Gv5YTbJ6Y1LbxFzUBvghhyhxCxkNGTXiX4TaqjivFGyFaQp9mDMLtCbrfUYEeWwp3ovxzvSB2XY87ph"

addressesFromExtPubKey({
    extPubKey: key,
    addressCount: 3,
})

// [
//     {
//         path: "m/84'/1'/0'/0/0",
//         address: 'tb1qdx0pd4h65d7mekkhk7n6jwzfwgqath7s9l2fum'
//     },
//     {
//         path: "m/84'/1'/0'/0/1",
//         address: 'tb1q5tc3z8c4hs4x0p3vu88zk26anecge77g33ggk6'
//     },
//     {
//         path: "m/84'/1'/0'/0/2",
//         address: 'tb1q3qu2fng7zw36cvzyaqec5nptp6cmnep0lf3323'
//     }
// ]
```

Address derivation will default to bech32 (native SegWit) unless a different
`purpose` is specified. For example: to derive wrapped SegWit addresses
(starting with `3...`) specify the appropriate purpose with `purpose: Purpose.P2SH`.

For more examples refer to the tests of this library.

## Relevant BIPs and Educational Resources

- [BIP 32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) - Hierarchical Deterministic Wallets
- [BIP 44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) - Multi-Account Hierarchy for Deterministic Wallets
- [BIP 49](https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki) - Derivation scheme for P2WPKH-nested-in-P2SH based accounts
- [BIP 84](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki) - Derivation scheme for P2WPKH based accounts

Samourai Wallet wrote a short summary on the differences between [BIP 44, BIP 49, BIP 84](https://support.samourai.io/article/65-bip-44-bip-49-and-bip84) and [XPUB's, YPUB's, ZPUB's](https://support.samourai.io/article/49-xpub-s-ypub-s-zpub-s). For a detailed explanation on derivation paths refer to [learn me a bitcoin](https://learnmeabitcoin.com/technical/derivation-paths).

## License: [MIT](./LICENSE.md)
