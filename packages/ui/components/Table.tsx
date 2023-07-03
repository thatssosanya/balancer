import { styled } from "styled-components"
import { Button, Icon } from "."
import { bg, bgLight, white } from "../colors"

const Table = ({ headings, data }: Props) => {
  return (
    <StyledContainer>
      <StyledTable>
        <StyledThead>
          <tr>
            {
              headings.map(({ key, title }) => (
                <StyledTd key={ key }>{ title }</StyledTd>
              ))
            }
            <StyledTd />
          </tr>
        </StyledThead>
        <StyledTbody>
          {
            data.map(d =>
              <tr key={ d[headings[0].key] }>
                {
                  headings.map(({ key }) =>
                    <StyledTd key={ d[key] }>{ d[key] }</StyledTd>
                  )
                }
                <StyledIconTd>
                  <StyledIconContainer>
                    <Icon type="circle" />
                  </StyledIconContainer>
                </StyledIconTd>
              </tr>
            )
          }
        </StyledTbody>
        <tfoot>
          <td colSpan={ headings.length + 1 }>
            <StyledFooter>
              <Button
                onClick={ () => { } }
                iconBefore={ <Icon type="circle" /> }
                size="sm"
                variant="transparent"
              >
                Prev
              </Button>
              <Button
                onClick={ () => { } }
                iconAfter={ <Icon type="circle" /> }
                size="sm"
                variant="transparent"
              >
                Next
              </Button>
            </StyledFooter>
          </td>
        </tfoot>
      </StyledTable>
    </StyledContainer>
  )
}

const StyledIconContainer = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledTd = styled("td")`
  padding: 14px 12px;
  border-left: 0;
  border-right: 0;
`

const StyledIconTd = styled(StyledTd)`
  width: 44px;
`

const StyledThead = styled("thead")`
  background-color: ${ bgLight };
  ${ StyledTd } {
    &:first-child {
      border-radius: 8px 0 0 0;
    }
    &:last-child {
      border-radius: 0 8px 0 0;
    }
  }
`

const StyledTbody = styled("tbody")`
  background-color: ${ white };
  & tr:nth-child(n+1) ${ StyledTd } {
    border-top: 1px solid ${ bg };
  }
  & tr:last-child ${ StyledTd } {
    border-bottom: 1px solid ${ bg };
  }
`

const StyledTable = styled("table")`
  width: 100%;
  border-collapse: collapse;
`

const StyledFooter = styled("div")`
  width: 100%;
  background-color: ${ bgLight };
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledContainer = styled("div")`
  width: 100%;
  overflow-x: auto;
`

interface Props {
  headings: {
    key: string,
    title: string
  }[]
  data: unknown[]
}

export { Table }
