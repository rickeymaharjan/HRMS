import { ActivitiesContext } from "../context/ActivitiesContext"
import { useContext } from "react"

export const useActivitiesContext = () => {
  const context = useContext(ActivitiesContext)
  if (!context) {
    throw new Error(
      "useActivitiesContext must be use inside an ActivitiesContextProvider."
    )
  }

  return context
}
