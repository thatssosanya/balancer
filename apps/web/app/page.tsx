"use client"
import { Button, Header } from "ui"
import { ethereum } from "features/mmWeb3"
import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    ethereum
      ?.request({ method: "eth_requestAccounts", params: [] })
      .then(r => console.log(r))
  }, [])

  return (
    <>
      <Header text="Web" />
      <Button />
    </>
  )
}
