import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Alert,
  Paper,
  Typography,
} from "@mui/material"

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize"
import { styled } from "@mui/system"
import PaymentCard from "./PaymentCard"
import axios from "axios"

import { useState, useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const PaymentForm = () => {
  const { user } = useAuthContext()
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users`)
        setUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (user) {
      fetchData()
    }
  }, [user])

  console.log(users)

  const handleSubmit = () => {
    console.log("request submitted")
  }

  const [open, setOpen] = useState(false)
  // Managing the states for the popup form
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="text"
        onClick={handleClickOpen}
        sx={{ fontSize: "0.8rem" }}
      >
        Pay Employee
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle
          variant="h4"
          sx={{
            paddingX: "50px",
            paddingTop: "30px",
          }}
        >
          Payment form
        </DialogTitle>

        <DialogContent
          // dividers
          sx={{
            background: "#f9fafb",
            paddingBottom: "30px",
            paddingX: "30px",
          }}
        >
         {users && users.map(user => (
            <PaymentCard key={user._id} user={user}/>
          ))}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PaymentForm
