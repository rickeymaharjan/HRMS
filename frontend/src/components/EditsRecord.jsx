import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Dialog,Select, MenuItem, DialogTitle, FormControlLabel, Radio, InputLabel, FormControl, FormLabel, RadioGroup, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import{useParams} from "react-router-dom"
export default function EditsRecord( { onClose, userId, isPopupOpen } ) {
  const [userData, setUserData] = useState({
        username: '',
        email: '',
        gender: '',
        phoneNumber: '',
        shifts: '',
        role: '', 
        status: ''

  }); // State to store user data

  const params = useParams();
  const getSingleUserData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${userId}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleUserData();
  }, [userId]);
  
   useEffect(() => {
    console.log("User Data:", userData);
  }, [userData]);
  

  const handleClose = () => {
    onClose();                        
  };
  const handleGenderChange = (event) => {
    setUserData({ ...userData, gender: event.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, phoneNumber, gender, role, status, shifts } = userData; 
    const newUser = {
      username,
      email,
      phoneNumber,
      gender,
      shifts,
      role, // Add role and status to the newUser object
      status,
    };
  
    try {
      const response = await axios.patch(`http://localhost:4000/api/users/${userId}`, newUser);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };


  return (
  <>
      <Dialog open={isPopupOpen} onClose={handleClose} maxWidth="60px">
        <form onSubmit={handleSubmit}>
          <DialogTitle
            variant="h4"
            sx={{
              paddingX: "30px",
              paddingTop: "30px",
            }}
          >
            Update Employee Record
          </DialogTitle>
          <DialogContent
            sx={{
              paddingBottom: 0,
              paddingX: "30px",
            }}
          >
             <Box display="flex" flexDirection="row" justifyContent="space-between">
              <TextField
                autoFocus
                required
                margin="dense"
                label="Full Name"
                type="text"
                minWidth= "3370"
                variant="outlined"
                value={userData.username || ''}
                sx={{
                  fontSize: "0.8rem",
                  marginRight: 1,
                  minWidth: "329px",
                }}
                onChange={(e) => setUserData({... userData, username: e.target.value })}
              />
             <Box sx={{ display: "flex", flexDirection: "row", marginTop: 1 }}>
              <FormControl component="fieldset">
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Female"
                  name="radio-buttons-group"
                  row
                  value={userData.gender || ''}
                  onChange={handleGenderChange}
                >
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Box>
              
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <TextField
                autoFocus
                required
                margin="dense"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                value={userData.email || ''}
                sx={{
                  fontSize: "0.8rem",
                  marginRight: 1,
                }}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                label="Phone Number"
                type="text"
                fullWidth
                variant="outlined"
                value={userData.phoneNumber || ''}
                sx={{
                  fontSize: "0.8rem",
                }}
                onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
              />
            </Box>
            <InputLabel id="demo-select-small-label" sx={{ marginRight: 1.5, marginTop: 1.5 }}>Shift Time</InputLabel>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1, marginTop: 1.5 }}>
              <TextField
                label="Start Time"
                type="time"
                value={userData.shifts?.startTime || ''}
                fullWidth
                onChange={(e) => setUserData({ ...userData, shifts: { ...userData.shifts, startTime: e.target.value } })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="End Time"
                type="time"
                fullWidth
                value={userData.shifts?.endTime || ''}
                onChange={(e) => setUserData({ ...userData, shifts: { ...userData.shifts, endTime: e.target.value } })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
                  
                  <Box sx={{display:"flex", flexDirection:"row", gap: 1, marginTop: 1.2}}>

                  <FormControl sx={{ marginTop: 1, minWidth: 330}} size="large">
                    <InputLabel id="demo-select-small-label">Role</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={userData.role || ''} 
                      label="role"
                      onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Employee">Employee</MenuItem>
                    </Select>

                  </FormControl>

                  <FormControl sx={{marginTop: 1, minWidth: 330}} size="large">
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={userData.status || ''} 
                      label="status"
                      onChange={(e) => setUserData({ ...userData, status: e.target.value })}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="On leave">On leave</MenuItem> {/* Use actual status values */}
                      <MenuItem value="Working">Working</MenuItem>
                    </Select>

                  </FormControl>
                  </Box>

          </DialogContent>

          <DialogActions
            sx={{
              paddingX: "30px",
              paddingY: "15px",
            }}
          >
            <Button onClick={handleClose}>Discard</Button>
            <Button type="submit" variant="outlined">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
  }
