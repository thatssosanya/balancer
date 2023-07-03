import { MetaMaskSDK } from "@metamask/sdk"
import { BrowserProvider } from "ethers"
import type { Eip1193Provider } from "ethers"

const mmSdk = new MetaMaskSDK({
  dappMetadata: {
    name: "Balancer",
  },
})

export const metamask = mmSdk.getProvider()

export const ethers = new BrowserProvider(metamask as Eip1193Provider)
