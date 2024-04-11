import { Paper, Typography, Button } from "@mui/material"
import { Box, Container } from "@mui/system"
import { Activity } from "lucide-react"
import ActivityLog from "../components/ActivityLog"
import Calendar from "../components/Calendar"
import CheckIn from "../components/CheckIn"
import { useAuthContext } from "../hooks/useAuthContext"

import InfoCard from "../components/InfoCard"

const Dashboard = () => {
  const { user } = useAuthContext()

  return (
    <Box sx={{
      marginX: "0",
      // border: "1px solid black",
      padding: "40px"
    }}>

      {/* Welcome message */}
      <Box sx={{
        marginY: 4
      }}>
        <Typography variant="h3">Hello, {user.email}</Typography>
        <Typography variant="subtitle2">Role Name</Typography>
      </Box>

      {/* Check in */}
      <CheckIn />
      
      {/* Cards */}
      <Box className="flex gap-10 mb-10">
        <InfoCard title="Total Employees" amount="20"/>
        <InfoCard title="Working" amount="17"/>
        <InfoCard title="On Leave" amount="3"/>
        <InfoCard title="Active Today" amount="14"/>
      </Box>

      {/* Activity log and Calendar */}
      <Box sx={{
        display: "flex",
        height: "400px",
        gap: 5
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