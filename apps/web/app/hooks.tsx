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
          const [weiBalance, assets] = await Promise.all([
            erc20.balanceOf(account),
            fetch(`${ process.env.NEXT_PUBLIC_API_URL }/assets?symbols=${ symbol.toLowerCase() }`)
              .then(r => r.json()) as Promise<{ vsUsd: string, marketCap: string }[]>
          ])
          const balance = formatEther(weiBalance)
          const vsUsd = parseFloat(assets[0]?.vsUsd)
          const value = vsUsd ? "$" + (parseFloat(balance) * vsUsd).toFixed(2) : "No data"
          const usdRate = vsUsd ? "$" + vsUsd.toFixed(2) : "No data"
          const marketCap = vsUsd ? "$" + parseFloat(assets[0]?.marketCap)?.toFixed(2) : "No data"
          return {
            symbol,
            balance,
            value,
            usdRate,
            marketCap,
          }
        }
      }))
    : []
  })
  return queries
}

export const useFirstRender = () => {
  const [firstRender, setFirstRender] = useState(true)
  useEffect(() => {
    setFirstRender(false)
  }, [])
  return firstRender
}
