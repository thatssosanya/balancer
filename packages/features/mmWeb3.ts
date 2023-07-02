import { MetaMaskSDK } from "@metamask/sdk"
import Web3 from "web3"

const mmSdk = new MetaMaskSDK({
  dappMetadata: {
    name: "Balancer",
  },
})

export const ethereum = mmSdk.getProvider()

export const web3 = new Web3(ethereum)
