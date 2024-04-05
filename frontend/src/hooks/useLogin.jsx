import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import axios from "axios"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = (email, password) => {
    setIsLoading(true)
    setError(null)

    const request = axios.post("/api/users/login", { email, password })
    request
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data))
        dispatch({ type: "LOGIN", payload: response.data })
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        setError(error.response.data.error)
      })
  }

  return { login, isLoading, error }
}
