import * as React from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box, Typography } from "@mui/material"
import { format, parseISO } from 'date-fns';
import axios from "axios"

import {useState, useEffect} from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const Attendance = () => {
  const [rows, setRows] = useState([])
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        if (user.role == "Employee") {
          const response = await axios.get(`/api/attendance/user`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = response.data
          const filteredRows = data.map(row => ({
            id: row._id,
            date: format(parseISO(row.date), 'MMMM dd'),
            checkinTime: format(parseISO(row.createdAt), 'HH:mm'),
            status: row.status
          }))
          setRows(filteredRows)
        } else {
          const response = await axios.get(`/api/attendance`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = response.data
          const filteredRows = data.map(row => ({
            id: row._id,
            name: row.username,
            date: format(parseISO(row.date), 'MMMM dd'),
            checkinTime: format(parseISO(row.createdAt), 'HH:mm'),
            status: row.status
          }))
          setRows(filteredRows)
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    if (user.token) {
      fetchAttendance();
    }
  }, [user]);

  let columns;

  if (user.role === "Employee") {
    columns = [
      { field: "date", headerName: "Date", width: 350 },
      { field: "checkinTime", headerName: "Check-in Time", width: 350 },
      { field: "status", headerName: "Status", width: 350 }
    ];
  } else {
    columns = [
      { field: "name", headerName: "Name", width: 260 },
      { field: "date", headerName: "Date", width: 260 },
      { field: "checkinTime", headerName: "Check-in Time", width: 260 },
      { field: "status", headerName: "Status", width: 260 }
    ];
  }  

  return (
    <Box
      sx={{
        marginX: "0",
        height: "100%",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{marginBottom: 3}}>Attendance History</Typography>
      <Box sx={{ flex: 1, width: "100%"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight 
        pageSize={10}
        disableColumnResize={true} 
    />

      </Box>
    </Box>
  )
}

export default Attendance
