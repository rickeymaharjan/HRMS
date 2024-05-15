import React, { useState } from "react"
import { Box, Button } from "@mui/material"
import axios from "axios"
import { useEffect } from "react"
import { useActivitiesContext } from "../hooks/useActivitiesContext"

import { useAuthContext } from "../hooks/useAuthContext"

const CheckIn = () => {
  const [attendanceStatus, setAttendanceStatus] = useState("pending")
  const [buttonColor, setButtonColor] = useState("blue")
  const [text, setText] = useState("Check In")
  const { user } = useAuthContext()
  const {dispatch: activityDispatch} = useActivitiesContext()

  useEffect(() => {
    const checkAttendance = async () => {
      try {
        const today = new Date().toISOString()
        const response = await axios.get(`/api/attendance/user/${today}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        setAttendanceStatus("present")
        setButtonColor("green")
        setText("Checked In")
      } catch (error) {
        console.log("User has yet to attend today.")
      }
    }

    checkAttendance()
  }, [user])

  const handleClick = async () => {
    if (attendanceStatus == "present") {
      setButtonColor("green")
      setText("Checked In")
      return
    }

    try {
      const response = await axios.post(
        `/api/attendance`,
        { username: user.username, status: "present" },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )

      const user_id = response.data.user_id
      const username = response.data.username
      const activity_type = "present"

      // Add the activity to the database
      axios
        .post(
          "api/activity/add",
          { username, activity_type },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((activity) => {
          const { date, _id } = activity
          // Update the state of activities
          activityDispatch({
            type: "CREATE_ACTIVITY",
            payload: { _id, user_id, username, date },
          })
        })
        .catch((error) => {
          console.log(error)
        })

      setAttendanceStatus("present")
      setButtonColor("green")
      setText("Checked In")
    } catch (error) {
      setAttendanceStatus("present")
      setButtonColor("green")
      setText("Checked In")
      console.log("User has already checked in for today.")
    }
  }

  return (
    <Box
      sx={{
        marginBottom: 3,
        display: "flex",
      }}
    >
      <Button
        variant="outlined"
        onClick={handleClick}
        sx={{
          fontSize: "0.9rem",
          borderColor: `${buttonColor}`,
          color: `${buttonColor}`,
          "&:hover": {
            borderColor: `${buttonColor}`,
          },
        }}
      >
        {text}
      </Button>
    </Box>
  )
}

export default CheckIn
