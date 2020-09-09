import { NETWORKS } from "unchained-bitcoin"
import { isValidXpub } from "./xpub"

describe("xpub", () => {
  test("xpub is valid", () => {
    expect(
      isValidXpub(
        "xpub6CCHViYn5VzKSmKD9cK9LBDPz9wBLV7owXJcNDioETNvhqhVtj3ABnVUERN9aV1RGTX9YpyPHnC4Ekzjnr7TZthsJRBiXA4QCeXNHEwxLab",
        NETWORKS.MAINNET
      )
    ).toBeTruthy()
  })
})
