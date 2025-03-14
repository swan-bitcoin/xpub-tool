# Swan's Address Derivation Tool

A small JavaScript library and accompanying cli tool that derives bitcoin addresses from extended public keys. Built upon [caravan](https://github.com/caravan-bitcoin/caravan) and [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib).

For more details refer to the individual packages:

- [`xpub-lib`](https://github.com/swan-bitcoin/xpub-tool/tree/master/packages/xpub-lib) - address derivation and validation library
- [`xpub-cli`](https://github.com/swan-bitcoin/xpub-tool/tree/master/packages/xpub-cli) - command-line interface

## Relevant BIPs and Educational Resources

- [BIP 32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) - Hierarchical Deterministic Wallets
- [BIP 44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) - Multi-Account Hierarchy for Deterministic Wallets
- [BIP 49](https://github.com/bitcoin/bips/blob/master/bip-0049.mediawiki) - Derivation scheme for P2WPKH-nested-in-P2SH based accounts
- [BIP 84](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki) - Derivation scheme for P2WPKH based accounts
- [BIP 86](https://github.com/bitcoin/bips/blob/master/bip-0086.mediawiki) - Key Derivation for Single Key P2TR Outputs

For a detailed explanation on derivation paths refer to [learn me a bitcoin](https://learnmeabitcoin.com/technical/derivation-paths).

## Publishing

The `xpub-lib` and `xpub-cli` can be published to GitHub Packages by:
1. Incrementing the version field within the package.json file within each package you want to publish.
2. Creating a new tag with SemVer sytax (i.e. v0.0.1). Needs to match `v*`.
3. Creating a new GitHub release using this tag. This will start the publish workflow.

The workflow will need to be approved by another user with write access before its executed. If published successfully, the packages will be published [here](https://github.com/orgs/swan-bitcoin/packages).

## License: [MIT](./LICENSE.md)
