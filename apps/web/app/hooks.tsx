import { useEffect, useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { ethers, metamask } from "features"
import { useRouter } from "next/navigation"
import { shallow } from "zustand/shallow"
import { Erc20__factory } from "features/contracts"
import { formatEther } from "ethers"
import { useMetamaskStore } from "../store"
import tokens from "features/tokens.json"


export const useMetamaskHandling = () => {
  const router = useRouter()

  const { setAccounts, setChainId } = useMetamaskStore(
    ({ setAccounts, setChainId }) => ({ setAccounts, setChainId }),
    shallow
  )

  useEffect(() => {
    const chainChangedHandler = (chainId: string) => {
      setChainId(parseInt(chainId).toString())
      router.refresh()
    }
    const accountsChangedHandler = (accounts: string[]) => {
      setAccounts(accounts)
    }
    metamask.on("chainChanged", chainChangedHandler)
    metamask.on("accountsChanged", accountsChangedHandler)
    return () => {
      metamask.removeListener("chainChanged", chainChangedHandler)
      metamask.removeListener("accountsChanged", accountsChangedHandler)
    }
  }, [router, setAccounts, setChainId])
}

export const useTokenData = (account) => {
  const queries = useQueries({
    queries:
      account
      ? tokens.map(({ symbol, address }) => ({
        queryKey: [symbol],
        queryFn: async () => {
          const erc20 = Erc20__factory.connect(address, ethers)
          const [balance, assets] = await Promise.all([
            erc20.balanceOf(account),
            fetch(`${ process.env.NEXT_PUBLIC_API_URL }/assets?symbols=${ symbol.toLowerCase() }`)
              .then(r => r.json()) as Promise<{ vsUsd: string, marketCap: string }[]>
          ])
          const formattedBalance = formatEther(balance)
          const vsUsd = parseFloat(assets[0].vsUsd)
          return {
            symbol,
            balance: formattedBalance,
            value: "$" + (parseFloat(formattedBalance) * vsUsd).toFixed(2),
            vsUsd: "$" + vsUsd.toFixed(2),
            marketCap: "$" + parseFloat(assets[0].marketCap).toFixed(2),
          }
        }
      }))
    : []
  })
  return queries.map(({ data }) => data).filter(Boolean)
}

export const useFirstRender = () => {
  const [firstRender, setFirstRender] = useState(true)
  useEffect(() => {
    setFirstRender(false)
  }, [])
  return firstRender
}
