"use client"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useMetamaskStore = create(
  persist<Store>(
    (set) => ({
      accounts: [],
      chainId: "",
      setAccounts:
        (accounts) => set(() => ({ accounts })),
      setChainId:
        (chainId: string) => set(() => ({ chainId })),
    }),
    {
      name: 'metamaskAccountStorage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

interface StoreData {
  accounts: string[]
  chainId: string
}

interface Store extends StoreData {
  setAccounts: (accounts: StoreData["accounts"]) => void
  setChainId: (chainId: StoreData["chainId"]) => void
}
