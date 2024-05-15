import { LeaveRequestsContext } from "../context/LeaveRequestsContext"
import { useContext } from "react"

export const useLeaveRequestsContext = () => {
  const context = useContext(LeaveRequestsContext)
  if (!context) {
    throw new Error(
      "useLeaveRequestsContext must be use inside an LeaveRequestsContextProvider."
    )
  }

  return context
}
