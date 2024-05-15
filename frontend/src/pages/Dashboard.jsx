import { Paper, Typography, Button, Avatar } from "@mui/material"
import { Box, Container } from "@mui/system"
import ActivityLog from "../components/ActivityLog"
import Calendar from "../components/Calendar"
import CheckIn from "../components/CheckIn"
import { useAuthContext } from "../hooks/useAuthContext"

import InfoCard from "../components/InfoCard"

const Dashboard = () => {
  const { user } = useAuthContext()

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Box sx={{
      marginX: "0",
      height: "100%",
      padding: "40px",
      display: "flex",
      flexDirection: "column"
    }}>

      {/* Welcome message */}
      <Box sx={{
        marginY: 3,
        // marginBottom: 4,
        display: "flex",
        alignItems: "center",
        gap: 2
      }}>
        <Avatar sx={{height: "60px", width: "60px"}}/>
        <Box>
          <Typography variant="h4">Hello, {user.username}</Typography>
          <Typography variant="subtitle2">{capitalizeFirstLetter(user.role)}</Typography>
        </Box>
      </Box>

      {/* Check in */}
      <CheckIn />
      
      {/* Cards */}
      <Box className="flex gap-6 mb-6">
        <InfoCard title="Total Employees" amount="20" img="icons/team.png"/>
        <InfoCard title="Working" amount="17" img="icons/working.png"/>
        <InfoCard title="On Leave" amount="3" img="icons/leave.png"/>
        <InfoCard title="Active Today" amount="14" img="icons/active.png"/>
      </Box>

      {/* Activity log and Calendar */}
      <Box sx={{
        display: "flex",
        height: "400px",
        gap: 3,
      }}>
        {/* Activity log */}
        <ActivityLog />

        {/* Calendar */}
        <Calendar />

      </Box>

    </Box>
  )
}

export default Dashboard