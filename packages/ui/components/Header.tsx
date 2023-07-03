import { styled } from "styled-components"
import { minWSm } from "../breakpoints"
import { grayMiddle } from "../colors"
import { Container } from "./Container"

const Header = ({ account }: Props) => {
  return (
    <StyledContainer as="header">
      <h5>BALANCER</h5>
      {
        account &&
        <StyledAccountContainer>
          <StyledAccountLabel>
            Account
          </StyledAccountLabel>
          <StyledAccountName>
            {
              account.slice(0, 7)
              + "..."
              + account.slice(-6)
            }
          </StyledAccountName>
        </StyledAccountContainer>
      }
    </StyledContainer>
  )
}

const StyledAccountName = styled("div")`
  padding: 12px 10px;
  color: ${ grayMiddle };
  border: 1px solid ${ grayMiddle };
  border-radius: 4px;
  text-transform: uppercase;
`

const StyledAccountLabel = styled("div")`
  color: ${ grayMiddle };
  display: none;
  ${ minWSm } {
    display: block;
  }
`

const StyledAccountContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

const StyledContainer = styled(Container)`
  height: 120px;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

interface Props {
  account?: string
}

export { Header }
