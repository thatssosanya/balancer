"use client"
import StyledComponentsRegistry from "../components/StyledComponentsRegistry"
import { Footer, Header } from "ui/components"
import styled from "styled-components"
import { black, bg } from "ui/colors"
import "../index.css"
import { usePathname } from "next/navigation"
import { useHydratedStore, useMetamaskStore } from "../store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const accounts = useHydratedStore(useMetamaskStore, (({ accounts }) => accounts))
  const pathname = usePathname()
  return (
    <html lang="en">
      <head></head>
      <body>
        <QueryClientProvider client={ queryClient }>
          <StyledComponentsRegistry>
            <StyledWrapper $inverted={ invertedRoutes.includes(pathname) }>
              <Header account={ accounts?.[0] } />
                { children }
              <Footer />
            </StyledWrapper>
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  )
}

const StyledWrapper = styled("div")<StyledWrapperProps>`
  width: 100%;
  min-height: 100%;
  color: ${ ({ $inverted }) => $inverted ? bg : black };
  background-color: ${ ({ $inverted }) => $inverted ? black : bg };
  display: flex;
  flex-direction: column;
`

interface StyledWrapperProps {
  $inverted?: boolean
}

const invertedRoutes = ["/connect"]

export default RootLayout
