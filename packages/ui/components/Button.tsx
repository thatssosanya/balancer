"use client"

import { styled } from "styled-components"
import { black, red, white } from "../colors"



const Button = ({
  onClick,
  disabled,
  variant,
  size,
  iconBefore,
  iconAfter,
  children,
  className,
}: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      disabled={disabled}
      $variant={variant}
      size={size}
      className={className}
    >
      { iconBefore }
      <div>
        { children }
      </div>
      { iconAfter }
    </StyledButton>
  )
}

const StyledButton = styled("button")<{
  size: Props["size"],
  $variant: Props["variant"],
}>`
  width: ${ ({ size }) =>
    size === "full" ? "100%" :
    size === "sm" ? "unset" :
    "200px"
  };
  padding: 16px 12px;
  border: 0;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  ${ ({ $variant }) => !$variant ? `
    color: ${ white };
    background-color: ${ black };` : ""
  }
  ${ ({ $variant }) => $variant === "light" ? `
    color: ${ black };
    background-color: ${ white };` : ""
  }
  ${ ({ $variant }) => $variant === "transparent" ? `
    background-color: transparent;` : ""
  }
  ${ ({ $variant }) => $variant !== "transparent" ? `
    &:hover {
      color: ${ white };
      background-color: ${ red };
    }` : ""
  }
  &:hover {
    cursor: pointer;
  }
`

interface Props {
  onClick: (...args: any) => any
  disabled?: boolean
  variant?: "light" | "transparent"
  size?: "sm" | "full"
  iconBefore?: React.ReactNode
  iconAfter?: React.ReactNode
  children: string
  className?: string
}

export { Button }
