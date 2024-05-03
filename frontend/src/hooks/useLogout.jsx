import { useAuthContext } from "./useAuthContext"
import { useActivitiesContext } from "./useActivitiesContext"
import axios from "axios"

export const useLogout = () => {
  const { dispatch, user } = useAuthContext()
  const { dispatch: activityDispatch } = useActivitiesContext()

  const logout = () => {
    const headers = {
      Authorization: `Bearer ${user.token}`,
    }
    
    const user_id = user.id
    const username = user.username
    const activity_type = "logout"
    
    // Add the activity to the database
    axios.post("api/activity/add", {username, activity_type}, {headers})
    .then(activity => {
      // Update the state of activities
      const { date } = activity
      activityDispatch({type: "CREATE_ACTIVITY", payload: {user_id, username, date}})
      console.log("Activity recorded: LOGOUT")
    })
    .catch(error => {
      console.log("Activity falied to record: LOGOUT")
      console.log(error)
    })
    
    localStorage.removeItem("user")
    dispatch({ type: "LOGOUT" })
  }

  return { logout }
}