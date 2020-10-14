# Swan's Address Derivation CLI

A small command-line tool to derive and validate bitcoin addresses from
extended public keys. Supports xpub, ypub, and zpub extended public keys and
their testnet equivalents. Support for legacy, SegWit, and native SegWit
(bech32) addresses. Uses [@swan-bitcoin/xpub-lib](https://www.npmjs.com/package/@swan-bitcoin/xpub-lib) under the hood.

## Basic Example

```
$ xpub derive xpub6CQtk4bkfG1d4UTWNBwmWGP95gjvTvEKZhm74CxLfbd4XqXY5wkyaUvLoWyy6Le24VxCqg2nASLu2xhNaDh5FhFDf8ndUUgbm8q1VDqCipy

bc1qcksx27qlksr2cy3pnwdw0mnm94c5cm0vz3jh6e
```

Address derivation defaults to native SegWit (bech32) addresses, i.e. the
derivation purpose is set to `84` (p2wpkh) by default. Set the `--purpose`
accordingly if you want to derive legacy or wrapped SegWit addresses.

The sub-commands `xpub derive` and `xpub validate` are explained in more detail below.

## `derive`: Address Derivation

The `xpub derive` command requires an extended public key (`extPubKey`) as an input.

```
Usage: xpub derive [options] [extPubKey]
```

Use `--testnet` to derive from testnet extended public keys (tpub, upub, vpub) and generate testnet addresses.

```
$ xpub derive -t tpubDCZv1xNTnmwmXe3BBMyXekiVreY853jFeC8k9AaEAqCDYi1ZTSTLH3uQonwCTRk9jL1SFu1cLNbDY76YtcDR8n2inSMwBEAdZs37EpYS9px

tb1qynjqnqvuwqys8l0jkuzmjuntj6ar4cyaeqwwk3
```

### Options

Run `xpub derive --help` to see all options.

- `-p, --purpose <purpose>` - derivation purpose which dictates the address type. Can be 'p2pkh', 'p2sh', or 'p2wpkh' (default: "p2wpkh")
- `-n, --addressCount <addressCount>` - number of addresses to generate (default: 1)
- `-c, --accountNumber <accountNumber>` - the account number as defined in BIP 44 (default: 0)
- `-i, --keyIndex <keyIndex>` - index of the address to generate (ignored if `addressCount` is set) (default: 0)
- `-t, --testnet` - use testnet

### Advanced Example

The following example derives the first three SegWit (p2sh) addresses of account 5 for the extended public key `ypub6XF...4wa`. Note that account numbers start at 0, so the account with number `5` will be shown as "Account Nr. 6" (or similar) in most wallets.

```
$ xpub derive ypub6XFA3jGfowZ6umedCYjPiMUeFetNQYDpUpHKqbrE3bzwawLmLbvYCYaUpiwZ6FHwU951b9dLd6hSvFJwHv763vvpXUV44PW62rtesm5g4wa -n3 -c5 --purpose p2sh

[
  {
    path: "m/49'/0'/5'/0/0",
    address: '3PEpUeFZUWJPrbdKGzaNeEpekSPpSbVSzL'
  },
  {
    path: "m/49'/0'/5'/0/1",
    address: '3AedcVmzeoUF4tHkzDHM6wp7WLoo668KwT'
  },
  {
    path: "m/49'/0'/5'/0/2",
    address: '3BpPnS79WUzRQMG2DCNUKHgSKCaNoAMPCu'
  }
]
```

## `validate`: Validation

The `xpub validate` command takes an encoded bitcoin address or an extended public key as an input.

```
Usage: xpub validate [options] [encoded]
```

```
$ xpub validate xpub6CCHViYn5VzKSmKD9cK9LBDPz9wBLV7owXJcNDioETNvhqhVtj3ABnVUERN9aV1RGTX9YpyPHnC4Ekzjnr7TZthsJRBiXA4QCeXNHEwxLab
```

`validate` will terminate without error if the extended public key or address is
valid. If invalid, `validate` will fail with exit code 1. 

Use `--verbose` to generate output and `--testnet` to validate testnet keys and addresses.

```
$ xpub validate --testnet tb1qynjqnqvuwqys8l0jkuzmjuntj6ar4cyaeqwwk3 --verbose

valid tb1qynjqnqvuwqys8l0jkuzmjuntj6ar4cyaeqwwk3
```

The `validate` command doesn't discriminate between extended public keys and addresses. You need to pass `--check-address` or `--check-ext` to do a validation that is exclusive.

```
$ xpub validate --check-ext --testnet tb1qynjqnqvuwqys8l0jkuzmjuntj6ar4cyaeqwwk3 --verbose

invalid extPubKey tb1qynjqnqvuwqys8l0jkuzmjuntj6ar4cyaeqwwk3
```

### Options

Run `xpub validate --help` to see all options.

- `-a, --check-address` - check bitcoin address for validity
- `-x, --check-ext` - check extended public key for validity
- `-t, --testnet` - use testnet
- `-v, --verbose` - verbose output

## License: [MIT](./LICENSE.md)
