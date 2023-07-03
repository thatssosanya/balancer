import { styled } from "styled-components"
import { minWMd, minWLg, minWXl, minWXxl, lg, xl } from "../breakpoints"

const StyledContainer = styled("div")`
  width: 100%;
  padding: 0 24px;
  ${ minWMd } {
    padding: 0 64px;
  }
  ${ minWLg } {
    padding: 0 128px;
  }
  ${ minWXl } {
    max-width: ${ lg }px;
    padding: 0;
    margin: 0 auto;
  }
  ${ minWXxl } {
    max-width: ${ xl }px;
  }
`

export { StyledContainer as Container }
