"use client"
import { useState } from "react"
import { ethers, metamask } from "features/ethers"
import { Button } from "ui/components"
import { useMetamaskStore } from "../../store"
import { useRouter } from "next/navigation"
import { shallow } from "zustand/shallow"

export const ConnectButton = ({ className }: Props) => {
  const {
    setAccounts,
    setChainId
  } = useMetamaskStore(
    ({ setAccounts, setChainId }) => ({ setAccounts, setChainId }),
    shallow
  )
  const [pending, setPending] = useState(false)

  const router = useRouter()
  const connect = () => {
    setPending(true)
    const promises = [
      metamask?.request({ method: 'eth_requestAccounts' }),
      ethers?.getNetwork(),
    ] as const
    Promise.all(promises)
      .then(([accounts, { chainId }]) => {
        setAccounts(accounts as string[])
        setChainId(chainId.toString())
        router.push("/")
      })
      .finally(() => setPending(false))
  }

  return (
    <Button
      onClick={ connect }
      disabled={ pending || !ethers }
      variant="light"
      size="full"
      className={ className }
    >
      METAMASK
    </Button>
  )
}

interface Props {
  className?: string
}
