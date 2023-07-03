import { useEffect, useState } from "react"

// https://github.com/pmndrs/zustand/issues/938
export const useHydratedStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const data = store(callback) as F

  const [firstRender, setFirstRender] = useState(true)
  useEffect(() => {
    setFirstRender(false)
  }, [])

  return firstRender ? null as F : data
}
