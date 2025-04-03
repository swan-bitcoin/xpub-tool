# Swan's Address Derivation Library

A small JavaScript library that derives bitcoin addresses from extended public keys. Built upon [caravan](https://github.com/caravan-bitcoin/caravan) and [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib).

The library supports derivation from `xpub`s, `zpub`s, and `ypub`s, as well as legacy, SegWit, native SegWit (bech32) and Taproot (P2TR) address formats. Both Bitcoin mainnet and testnet are supported. If no network is specified the library defaults to testnet.

| BIP | Derivation Path     | Address Type | Address Format | Address Name           |
| --- | ------------------- | ------------ | -------------- | ---------------------- |
| 44  | `m/44'/0'/0'`       | P2PKH        | `1...`         | Legacy                 |
| 49  | `m/49'/0'/0'`       | P2WPKH-P2SH  | `3...`         | SegWit (Nested SegWit) |
| 84  | `m/84'/0'/0'`       | P2WPKH       | `bc1q...`      | Bech32 (Native SegWit) |
| 86  | `m/86'/0'/0'`       | P2TR         | `bc1p...`      | Taproot                |

Note that the different extended public key formats (i.e. xpub, ypub, zpub) are interchangeable and
not bound to address formats. Every address type can be generated from every
extended public key.

The testnet equivalents are extended public keys starting with `tpub`, `upub`, and `vpub`.

## Example Usage

```
yarn add @swan-bitcoin/xpub-lib
```

Use `addressFromExtPubKey` to derive a single addresses. The following example
derives the first address of the first account from an `xpub` on mainnet. If no purpose is given, it will default to P2WPKH (Native SegWit).

```
const key = "xpub6EuV33a2DXxAhoJTRTnr8qnysu81AA4YHpLY6o8NiGkEJ8KADJ35T64eJsStWsmRf1xXkEANVjXFXnaUKbRtFwuSPCLfDdZwYNZToh4LBCd"

addressFromExtPubKey({ extPubKey: key, network: "mainnet" })

// {
//     path: "m/84'/0'/0'/0/0",
//     address: 'bc1qdx0pd4h65d7mekkhk7n6jwzfwgqath7s0e368g'
// }
```

For taproot addresses, you must first initialize an instance of an ECC library implementing the secp256k1 elliptic curve interface, such as [tiny-secp256k1](https://www.npmjs.com/package/tiny-secp256k1).

```
const ecc = require('tiny-secp256k1')
initEccLib(ecc)

const key = "xpub6EuV33a2DXxAhoJTRTnr8qnysu81AA4YHpLY6o8NiGkEJ8KADJ35T64eJsStWsmRf1xXkEANVjXFXnaUKbRtFwuSPCLfDdZwYNZToh4LBCd"

addressFromExtPubKey({ extPubKey: key, network: "mainnet", purpose: Purpose.P2TR })

// {
//     path: "m/86'/0'/0'/0/0",
//     address: 'bc1ptpvckxtuurh4t26yls5s6t5j9hyy2fh945zfpad44ngxdxqm0s2qhk3ljc'
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

To derive wrapped SegWit addresses
(starting with `3...`) specify the appropriate purpose with `purpose: Purpose.P2SH`.

For more examples refer to the tests of this library or the implementation of the CLI tool.

## Relevant BIPs and Educational Resources

- [BIP 32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) - Hierarchical Deterministic Wallets
- [BIP 44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) - Multi-Account Hierarchy for Deterministic Wallets
- [BIP 49](https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki) - Derivation scheme for P2WPKH-nested-in-P2SH based accounts
- [BIP 84](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki) - Derivation scheme for P2WPKH based accounts
- [BIP 86](https://github.com/bitcoin/bips/blob/master/bip-0086.mediawiki) - Key Derivation for Single Key P2TR Outputs

For a detailed explanation on derivation paths refer to [learn me a bitcoin](https://learnmeabitcoin.com/technical/derivation-paths).

## License: [MIT](./LICENSE.md)
