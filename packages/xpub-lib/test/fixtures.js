// Same extended public key, different formats. Both testnet and mainnet.
// Includes first valid address (legacy, segwit, bech32)
const KEY = {
  MAIN: {
    XPUB:
      "xpub6EuV33a2DXxAhoJTRTnr8qnysu81AA4YHpLY6o8NiGkEJ8KADJ35T64eJsStWsmRf1xXkEANVjXFXnaUKbRtFwuSPCLfDdZwYNZToh4LBCd",
    YPUB:
      "ypub6ZjkLiEwNDVeZ6VaFpaULvtV3sGT6n43CvrktC2G6H87ME8PTxCe59inL5QUWnRM4f5LVhkvxPsoR5C33Hqu4Bb3FY35oYPRp6d7CCfcqmo",
    ZPUB:
      "zpub6ta1eNurWu38QPgh6BN6Z1yzDqQu3Q3Y83Nyfav9UHVzQKwcicNChDNvMHN4Wh5GUJC9FBMVR4EMJMobkzFurRGe7sjWPTCv5pgkaqEA6or",
    LEGACY: "1AdTLNfqiQtQ7yRNoZDEFTE9kSri2jrRVD",
    SEGWIT: "3JDVonJcuQ7yQQQJh1tFLV74uRZUP6LgvF",
    BECH32: "bc1qdx0pd4h65d7mekkhk7n6jwzfwgqath7s0e368g",
  },
  TEST: {
    TPUB:
      "tpubDFH7ZHPhvoucybVJsemwLm8MD2Df9YZbqSvqTMBX4BW83QysHWtAbXjUYuXg3NifSvVSMogF2qMJDy55iTH89PMjSo5xuAEB8L9sZdEkW4B",
    UPUB:
      "upub5GQh83ZGmVKj9uj6vPRyWaWUMzgfLJ63YUmskcSiaFcb8psUTKYPau6EFFa8X9ofS6c7VoNh7kTbsvjnAWBqsErdnBFPTu7UjCNXdwwAxf1",
    VPUB:
      "vpub5bExRiEBvAsD1CvDkkDbifbyXxq7Gv5YTbJ6Y1LbxFzUBvghhyhxCxkNGTXiX4TaqjivFGyFaQp9mDMLtCbrfUYEeWwp3ovxzvSB2XY87ph",
    LEGACY: "mq9QdRkpXSKeu5tzX8Bc5NSUcSTQxzpa8G",
    SEGWIT: "2N9mhsXEeWrdKcC2rN9W7xS6L7mme9kJrVe",
    BECH32: "tb1qdx0pd4h65d7mekkhk7n6jwzfwgqath7s9l2fum",
  },
}

const KEYS = {
  MAIN: {
    XPUB: [
      "xpub6CCHViYn5VzKSmKD9cK9LBDPz9wBLV7owXJcNDioETNvhqhVtj3ABnVUERN9aV1RGTX9YpyPHnC4Ekzjnr7TZthsJRBiXA4QCeXNHEwxLab",
      "xpub6D7NqpxWckGwCHhpXoL4pH38m5xVty62KY2wUh6JoyDCofwHciDRoQ3xm7WAg2ffpHaC6X4bEociYq81niyNUGhCxEs6fDFAd1LPbEmzcAm",
      "xpub6BfKpqjTwvH21wJGWEfxLppb8sU7C6FJge2kWb9315oP4ZVqCXG29cdUtkyu7YQhHyfA5nt63nzcNZHYmqXYHDxYo8mm1Xq1dAC7YtodwUR",
    ],
    YPUB: [
      "ypub6ZjkLiEwNDVeZ6VaFpaULvtV3sGT6n43CvrktC2G6H87ME8PTxCe59inL5QUWnRM4f5LVhkvxPsoR5C33Hqu4Bb3FY35oYPRp6d7CCfcqmo",
      "ypub6TgEG2U9Fvznqe16tYu5vbaEnPXpFUue1MVN2wXDH21fk9LXEgVGLL93t6dz6vA6Kg2R7ywzoZv9vPe6DUXud9n47T7CKW6xjXrX87MhYLU",
      "ypub6YdKsNXoig5FEiM57Qrr7GzePXGBYZQJX4NRhkgoWej1qbtAEZeLTdU3MABFhJAyDCrjnTWL8wZDbc2hzPAAYrzEaMa6W4W4BCnhpg5B7aW",
    ],
    ZPUB: [
      "zpub6ssizzcfQnWpVVeQJ7zy5tXEWA5gqRo3cFLn1cM8z8tdqoTQPDoKayrj9zF4mraaNUTeHA6cSyb5qL93QdMFrzruEdGYjRC1hKEyghMhwZZ",
      "zpub6sL1LBEvyMhmE4HZ4nr3RbsuqVBqTsLiGLf1ogsTCdzVJ43ngxyrKrYMoDiTT7ka6MxYRUacQzgqCL6bdCHCjkSTmhi8aN1uom3xdkzXktK",
      "zpub6tHb7NmWm4nPu18fQ4Tk1xS4etNryiKVqti3A83i5mzcqZjFnMrX95hnYj6yj6zkpzRmkbNhvZE5vzhyiEstYLdG8SVZnbLrf341WDzvQWt",
    ],
  },
  TEST: {
    TPUB: [
      "tpubDCZv1xNTnmwmXe3BBMyXekiVreY853jFeC8k9AaEAqCDYi1ZTSTLH3uQonwCTRk9jL1SFu1cLNbDY76YtcDR8n2inSMwBEAdZs37EpYS9px",
      "tpubDEQApNpryrEgXYPwsqmQWoeirc5nt4yawFcjaSg5ENHBoEgfLnHuwzVehZG4Nn2qbfLjotwuZFrGkNHyt9EWWkfoVfaPWWsAsV9VopxgUYr",
      "tpubD9RP6BdSN6wdxmjNwVKu7NDFQNjwxSAq32Se4NM5AJGKaYpr4YHVSrq5BEbZH1pbqq17zXGQhXLAvvfVfWQESenVgHjmYgcjLQMpJfz4HoY",
    ],
    UPUB: [
      "upub5GGT3WZcGGFQZycqExe4iTxx8iL2BqXcJTXGTCALaoRvDjPD889bHZPXoRz3z9EGnx3GzCu7WuAPDnNUronFVDZjWsGJSUWpf63qVJqmGt1",
      "upub5ExvzmRuiP6T4XWG6qMi6NjQbMxnqmJewxwgHHTrkekfCfzCHvtWjLDWhhcXfsT7EnFiFGurxJJ7eNokXcZb2y6khVDEeiQJHbxBzKJ72AH",
      "upub5FNubXv4KESULE6ya9A42MzGcwkX2GneMy3rmUVEfLKe2veFd4y4f5WG5WjJp72eV162EGoLE8fsiYcQiSjEK8gYanA5sTEphsbXPvdizn4",
    ],
    VPUB: [
      "vpub5bTmE9K4QmkbLUnWm6pmKgRDLkckrJprBBUx49PwEEAqgb3ehJo45FamVZ481S3dvhaRbDnUrFxqDC61yLTGSEcHyvAA365DmsjpADBAqrB",
      "vpub5Ybrievs5pSmu6utBXJGqxLWZ9cNcL4qkPZAZd7vbM68tUKh7wewzRDTTEKtoqC25VvWEZbrTRuhhcx9eN7kYCxann64AzrbFtTG2Vq9zF5",
      "vpub5abgwCpBesPT6h2Z1Qg3GbemVfRnquT3ogegq97tPTfiaqALZJdfSEnB1cwWxY2C2Z3MsARyDLX2t7GqbZHterjT8P874KwMC4W89mm2Q4U",
    ],
  },
}

const WASABI = {
  XPUB:
    "xpub6CQtk4bkfG1d4UTWNBwmWGP95gjvTvEKZhm74CxLfbd4XqXY5wkyaUvLoWyy6Le24VxCqg2nASLu2xhNaDh5FhFDf8ndUUgbm8q1VDqCipy",
  YPUB:
    "ypub6XFA3jGfowZ6umedCYjPiMUeFetNQYDpUpHKqbrE3bzwawLmLbvYCYaUpiwZ6FHwU951b9dLd6hSvFJwHv763vvpXUV44PW62rtesm5g4wa",
  ZPUB:
    "zpub6r5RMPwaxd6am4qk2uX1vSa9Rd2pMADKPvoYczk7RcNpe39zbG66pcEcqvu969wrsnBpLdDu5m3zoXvW1cX6rAcRPpBUeJKaJaxJGLBWaLe",
  ADDRESSES: [
    "bc1qcksx27qlksr2cy3pnwdw0mnm94c5cm0vz3jh6e",
    "bc1qw0c77zue3xduyh4jef3r3jhfpx30jxc7s5z7lv",
    "bc1ql4l5m2wnlcwl28rsu0k8k5rx7yjg9fkr2vld8p",
  ],
}

const SAMOURAI = {
  ZPUB:
    "zpub6rk5rRte9pPyKTNuP2iKak9ZSEqvsXMP48TQoP23vjVDLeywBwJKcCzj1avQEybYVD1A9uTDmou8F5hcL6KFataVGjyzZxwYyDLqBEv9H8R",
  ADDRESSES: [
    "bc1qg7v2efej3lqmj828lcgfnedptrdncjv4mgpyfd",
    "bc1qjvpph2k4h3rvfdwrlczgsrs0ku6ymzq9z5ct2v",
    "bc1qtnew2mxs90w53qwta7wqhk89hruka6mqsrnkr8",
  ],
}

export { KEY, KEYS, WASABI, SAMOURAI }
