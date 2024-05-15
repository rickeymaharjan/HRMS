import { Box, Paper, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useActivitiesContext } from "../hooks/useActivitiesContext"
import { useAuthContext } from "../hooks/useAuthContext"

import formatDistanceToNow from "date-fns/formatDistanceToNow"

const ActivityLogCard = ({ activity }) => {
  return (
    <Paper
      className="bg-gradient-to-tr from-gray-50 to-gray-100 my-2"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: 2,
        borderRadius: "15px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.00999)",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="caption">
        {activity.activity_type === "login" ? `${activity.username} has logged in to the system.` :
        activity.activity_type === "logout" ? `${activity.username} has logged out of the system.` :
        activity.activity_type === "present" ? `${activity.username} has checked in.` :
        activity.activity_type === "absent" ? `${activity.username} has missed their shift` : ''}
      </Typography>

      {activity.date && typeof activity.date === 'string' && (
        <Typography variant="caption">
          {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
        </Typography>
      )}
    </Paper>
  )
}

const ActivityLog = () => {
  const { activities, dispatch } = useActivitiesContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const today = new Date();
        const dateString = today.toISOString();
        const response = await axios.get(`/api/activity/date/${dateString}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch({ type: "SET_ACTIVITY", payload: response.data });
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    if (user.token) {
      fetchActivities();
    }
  }, [user, dispatch]);


  return (
    // Container
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        padding: 3,
        paddingBottom: 6,
        flex: 3,
        borderRadius: "15px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.00999)",
        boxSizing: "border-box",
      }}
    >
      <Typography sx={{ paddingLeft: 1 }} variant="h5">
        Activity log
      </Typography>

      {/* Activity logs */}
      <Box
        sx={{
          marginTop: 0.5,
          width: "100%",
          height: "100%",
          overflow: "scroll",
        }}
      >
        {activities &&
          activities.map((activity) => (
            <ActivityLogCard key={activity._id} activity={activity} />
          ))}

      </Box>
    </Paper>
  )
}

export default ActivityLog
