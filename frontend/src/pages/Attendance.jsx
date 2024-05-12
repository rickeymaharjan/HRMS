import * as React from "react"
import { DataGrid } from "@mui/x-data-grid"
import { Box, Typography } from "@mui/material"

const Attendance = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    }
  ]

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 15 },
    { id: 6, lastName: "Melisandre", firstName: "grande", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ]

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
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableColumnResize={true} 
        />
      </Box>
    </Box>
  )
}

export default Attendance
