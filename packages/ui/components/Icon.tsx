import Circle from "../assets/icons/Circle.svg"

const Icon = ({ type }: Props) => {
  return (
    <img src={ typeMap[type]?.src } />
  )
}

const typeMap: Record<Types, { src: string }> = {
  circle: Circle
}

interface Props {
  type: Types
}

type Types = "circle"

export { Icon }
