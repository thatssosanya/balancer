import { styled } from "styled-components"
import { Container } from "./Container"

const Footer = ({ className }: Props) => {
  return (
    <StyledContainer as="footer" className={ className }>
      <a href="/privacy-policy">
        PRIVACY POLICY
      </a>
      <p>
        © 2023 All rights reserved
      </p>
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  height: 120px;
  padding-top: 40px;
  padding-bottom: 40px;
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

interface Props {
  className?: string
}

export { Footer }
