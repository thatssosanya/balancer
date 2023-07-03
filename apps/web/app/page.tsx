"use client"
import { metamask } from "features"
import { useRouter } from "next/navigation"
import { styled } from "styled-components"
import { Container, Table } from "ui/components"
import { minWXl } from "ui/breakpoints"
import { useMetamaskStore, useHydratedStore } from "../store"
import { useTokenData as useTokenQueries, useFirstRender, useMetamaskHandling } from "./hooks"

const Page = () => {
  const accounts = useHydratedStore(useMetamaskStore, ({ accounts }) => accounts)
  const chainId = useHydratedStore(useMetamaskStore, ({ chainId }) => chainId)

  useMetamaskHandling()

  const tokenQueries = useTokenQueries(accounts?.[0])

  const router = useRouter()
  const firstRender = useFirstRender()
  if (firstRender || tokenQueries.some(q => q.isInitialLoading)) {
    return Loading
  }

  if (!firstRender && (!accounts?.length || !metamask.isConnected())) {
    router.push("/connect")
    return Loading
  }

  if (chainId !== BSC_TESTNET_CHAIN_ID) {
    return (
      <Container>
        <h5>
          Network is not BSC Testnet.
        </h5>
        <p>
          This app only supports the BSC Testnet network. Please switch to BSC Testnet.
        </p>
      </Container>
    )
  }
  console.log(tokenQueries)

  return (
    <AssetsContainer>
      <h1>
        Assets
      </h1>
      <Table
        headings={
          [
            { key: "symbol", title: "Token" },
            { key: "balance", title: "Balance" },
            { key: "value", title: "Value" },
            { key: "usdRate", title: "Price per" },
            { key: "marketCap", title: "Market Cap" },
          ]
        }
        data={ tokenQueries.map(({ data }) => data).filter(Boolean) }
      />
    </AssetsContainer>
  )
}

const AssetsContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 48px;
  ${ minWXl } {
    gap: 96px;
  }
`

const Loading = (
  <Container>
    <h5>
      Loading...
    </h5>
  </Container>
)

const BSC_TESTNET_CHAIN_ID = "97"

export default Page
