import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material"
import axios from 'axios';


export default function AddRecord() {
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const shifts= { startTime, endTime };

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
    // Clear form fields after closing the dialog
    setUsername('')
    setEmail('');
    setPhoneNumber('');
    setRole('');
    setGender('');
    setStatus('');
    setStartTime('09:00');
    setEndTime('17:00');
  };
  
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, phoneNumber, gender, role, status, shifts)

    const newUser = {
      username,
      email,
      phoneNumber,
      gender,
      shifts
    }

    try {
      const response = await axios.post('http://localhost:4000/api/users', newUser)
      console.log(response.data)
      handleClose();
    } catch (error) {
      console.log(error)
    }
   
  };

  return (
    <>
      <Button
        variant="text"
        onClick={handleClickOpen}
        sx={{ fontSize: "0.8rem" }}
      >
        Add New Record
      </Button>

      <Dialog open={open} onClose={handleClose}  maxWidth= "60px">
        <form onSubmit={handleSubmit}>
          <DialogTitle
            variant="h4"
            sx={{
              paddingX: "30px",
              paddingTop: "30px",
            }}
          >
            New Employee Form
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
                value={username}
                sx={{
                  fontSize: "0.8rem",
                  marginRight: 1,
                  minWidth: "329px",
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Box sx={{ display: "flex", flexDirection: "row", marginTop: 1 }}>
              <FormControl component="fieldset">
                <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Female"
                  name="radio-buttons-group"
                  row
                  value={gender}
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
                value={email}
                sx={{
                  fontSize: "0.8rem",
                  marginRight: 1
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                label="Phone Number"
                type="text"
                fullWidth
                variant="outlined"
                value={phoneNumber}
                sx={{
                  fontSize: "0.8rem",
                }}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Box>
            <InputLabel id="demo-select-small-label" sx={{ marginRight: 1.5, marginTop: 1.5 }}>Shift Time</InputLabel>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1, marginTop: 1.5 }}>
              <TextField
                label="Start Time"
                type="time"
                value={startTime}
                fullWidth
                onChange={(e) => setStartTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="End Time"
                type="time"
                fullWidth
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
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
                      value={role} 
                      label="role"
                      onChange={(e) => setRole(e.target.value)} 
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
                      value={status} // value should be the selected status, not hardcoded value
                      label="status"
                      onChange={(e) => setStatus(e.target.value)} // update status state with selected value
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
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
