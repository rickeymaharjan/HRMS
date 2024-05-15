import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useActivitiesContext } from "./useActivitiesContext"
import axios, { Axios } from "axios"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const {dispatch: activityDispatch} = useActivitiesContext()

  const login = (email, password) => {
    setIsLoading(true)
    setError(null)

    const request = axios.post("/api/users/login", { email, password })
    request
      .then((response) => {
        // console.log(response)
        const headers = {
          Authorization: `Bearer ${response.data.token}`,
        }

        const user_id = response.data.id
        const username = response.data.username
        const activity_type = "login"

        // Add the activity to the database
        axios.post("api/activity/add", {username, activity_type}, {headers})
          .then(activity => {
            const { date, _id } = activity
            // Update the state of activities
            activityDispatch({type: "CREATE_ACTIVITY", payload: {_id, user_id, username, date}})
          })
          .catch(error => {
            console.log(error)
          })

        // Add the user data to local storage
        localStorage.setItem("user", JSON.stringify(response.data))

        // Update user state (authorized user)
        dispatch({ type: "LOGIN", payload: response.data })
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
        // setError(error.response.data.error)
      })
  }

  return { login, isLoading, error }
}
