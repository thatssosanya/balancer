"use client"
import { styled } from "styled-components"
import { Container } from "ui/components"
import { minWLg } from "ui/breakpoints"
import { ConnectButton } from "./ConnectButton"

const ConnectPage = () => {
  return (
    <StyledContainer as="main">
      <article>
        <h1>
          Track Your Crypto Wealth with Our Wallet Balance Service
        </h1>
        <StyledConnectButton />
      </article>
      <StyledGraphics>
        <div>
          Let&apos;s assume I put the shapes here
        </div>
      </StyledGraphics>
    </StyledContainer>
  )
}

const StyledConnectButton = styled(ConnectButton)`
  margin-top: 125px;
`

const StyledGraphics = styled("div")`
  display: none;
  justify-content: center;
  align-items: center;
  ${ minWLg } {
    display: flex;
  }
`

const StyledContainer = styled(Container)`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export default ConnectPage
