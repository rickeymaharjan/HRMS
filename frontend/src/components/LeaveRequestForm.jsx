import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Alert
} from "@mui/material"

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize"
import { styled } from "@mui/system"
import axios from "axios"

import { useLeaveRequestsContext } from "../hooks/useLeaveRequestsContext"
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"


// Styled Textarea
const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
}

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'Noto Sans', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: #1C2025;
    background: #fff;
    border: 1px solid #B0B8C4;
    box-shadow: 0px 2px 2px #F3F6F9;

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  `
)

// Leave request form
export default function LeaveRequestForm() {
  const { requests, dispatch } = useLeaveRequestsContext();
  const { user } = useAuthContext()

  const [open, setOpen] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  const pendingRequestsExist = requests && requests.some(request => request.status === "pending");

  const handleStartDateChange = (date) => {
    setStartDate(date)
    if (endDate && date > endDate) {
      setEndDate(null)
    }
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
    if (startDate && date < startDate) {
      setStartDate(null)
    }
  }

  // Managing the states for the popup form
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const username = user.username
    
    if (!title, !startDate, !endDate, !description) {
      setError("Fill out all the fields before submitting.")
      return
    }

    const newRequest = {
      username,
      title,
      startDate,
      endDate,
      description
    }

    try {
      axios.post(`/api/leave`, newRequest, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(response => {
        dispatch({ type: "CREATE_REQUEST", payload: response.data });
        setTitle("")
        setDescription("")
        setStartDate(null)
        setEndDate(null)
        setError("")
        handleClose()
      })
      .catch(error => {
        console.error("Error posting request:", error);
        setError("Error posting request.")
      });
    } catch (error) {
      console.error("Error posting requests:", error);
      setError("Error posting request.")
    }


  }

  return (
    <>
      <Button
        variant="text"
        onClick={handleClickOpen}
        disabled={pendingRequestsExist}
        sx={{ fontSize: "0.8rem" }}
      >
        Submit leave request
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle
            variant="h4"
            sx={{
              paddingX: "30px",
              paddingTop: "30px",
            }}
          >
            Leave Request Form
          </DialogTitle>

          <DialogContent
            // dividers
            sx={{
              paddingBottom: 0,
              paddingX: "30px"
            }}
          >
            {/* Title Field */}
            <TextField
              autoFocus
              required
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              sx={{
                fontSize: "0.8rem",
                marginBottom: 1.5,
              }}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Date picker */}
            <Box sx={{ display: "flex", gap: 1.5, marginBottom: 1.5 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  textField={<TextField size="small" />}
                  sx={{ flex: 1 }}
                />

                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  minDate={startDate}
                  textField={<TextField size="small" />}
                  sx={{ flex: 1 }}
                />
              </LocalizationProvider>
            </Box>

            {/* Textarea for description */}
            <Textarea
              aria-label="Description"
              minRows={8}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {error && 
              <Alert severity="error">{error}</Alert>
            }

          </DialogContent>

          <DialogActions
            sx={{
              paddingX: "30px",
              paddingY: "15px",
            }}
          >
            <Button onClick={handleClose}>Discard</Button>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

