# Swan's Address Derivation Tool

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A small JavaScript library that derives bitcoin addresses from extended public keys. Built upon
[unchained-bitcoin](https://github.com/unchained-capital/unchained-bitcoin)
and [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib).

```

```

The library supports derivation from `xpub`s, `zpub`s, and `ypub`s, as well as
legacy, SegWit, and native SegWit (bech32) address formats. Both Bitcoin
mainnet and testnet are supported.

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

## Relevant BIPs and Educational Resources

- [BIP 32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) - Hierarchical Deterministic Wallets
- [BIP 44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) - Multi-Account Hierarchy for Deterministic Wallets
- [BIP 49](https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki) - Derivation scheme for P2WPKH-nested-in-P2SH based accounts
- [BIP 84](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki) - Derivation scheme for P2WPKH based accounts

Samourai Wallet wrote a short summary on the differences between [BIP 44, BIP 49, BIP 84](https://support.samourai.io/article/65-bip-44-bip-49-and-bip84) and [XPUB's, YPUB's, ZPUB's](https://support.samourai.io/article/49-xpub-s-ypub-s-zpub-s). For a detailed explanation on derivation paths refer to [learn me a bitcoin](https://learnmeabitcoin.com/technical/derivation-paths).

## License: [MIT](./LICENSE.md)
