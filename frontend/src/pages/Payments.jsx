import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { format, parseISO } from 'date-fns';
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import PaymentForm from "../components/PaymentForm";

const Payments = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [usernames, setUsernames] = useState([]);

  const { user } = useAuthContext()

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get(`/api/payment`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = response.data
          const formattedData = data.map(row => ({
            id: row.user_id,
            date: format(parseISO(row.paymentDate), 'yyyy, MMMM dd'),
            name: row.username,
            status: row.status,
            amount: row.amountPaid,
            paidBy: row.paidBy
          }))
          setRows(formattedData);
          setFilteredRows(formattedData)

    //   setRows(formattedData);
      setFilteredRows(formattedData);

      // Extract unique usernames for the filter dropdown
      const uniqueUsernames = [...new Set(formattedData.map(row => row.name))];
      setUsernames(uniqueUsernames);
    };

    fetchData();
  }, []);

  const handleUsernameChange = (event) => {
    const selectedName = event.target.value;
    setSelectedUsername(selectedName);
    if (selectedName) {
      setFilteredRows(rows.filter(row => row.name === selectedName));
    } else {
      setFilteredRows(rows);
    }
  };

  const columns = [
    { field: "date", headerName: "Date", width: 210 },
    { field: "name", headerName: "Name", width: 210 },
    { field: "amount", headerName: "Amount", width: 210 },
    { field: "status", headerName: "Status", width: 210 },
    { field: "paidBy", headerName: "Paid-By", width: 210 }
  ];

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
      <Typography variant="h4" sx={{ marginBottom: 3 }}>Payment History</Typography>
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <FormControl sx={{ marginBottom: 3, width: 150 }} size="small">
            <InputLabel id="username-select-label">Select User</InputLabel>
            <Select
            variant="outlined"
            labelId="username-select-label"
            value={selectedUsername}
            onChange={handleUsernameChange}
            label="Username"
            >
            <MenuItem value="">
                <em>All</em>
            </MenuItem>
            {usernames.map(username => (
                <MenuItem key={username} value={username}>
                {username}
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        
        <PaymentForm />
      </Box>
      <Box sx={{ flex: 1, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          autoHeight
          pageSize={10}
          disableColumnResize={true}
        />
      </Box>
    </Box>
  );
};

export default Payments;
