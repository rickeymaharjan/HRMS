import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import axios from "axios"

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = (username, email, password, gender) => {
    setIsLoading(true)
    setError(null)

    const request = axios.post("/api/users/signup", {
      username,
      email,
      password,
      gender,
    })
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

  return { signup, isLoading, error }
}
