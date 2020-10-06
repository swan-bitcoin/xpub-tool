# Swan's Address Derivation CLI

A small command-line tool to derive bitcoin addresses from extended public
keys. Supports xpub, ypub, and zpub extended public keys and their testnet
equivalents. Support for legacy, SegWit, and native SegWit (bech32) addresses.

## Derivation

The `xpub derive` command takes an extended public key as an input.

```
xpub derive [options] [extPubKey]
```

### Basic Example

```
$ xpub derive xpub6CQtk4bkfG1d4UTWNBwmWGP95gjvTvEKZhm74CxLfbd4XqXY5wkyaUvLoWyy6Le24VxCqg2nASLu2xhNaDh5FhFDf8ndUUgbm8q1VDqCipy

bc1qcksx27qlksr2cy3pnwdw0mnm94c5cm0vz3jh6e
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
- `-t, --testnet` - use TESTNET

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

### Purpose

## Validation
