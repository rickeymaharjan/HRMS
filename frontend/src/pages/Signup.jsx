import React, { useState } from "react"
import Box from "@mui/material/Box"
import {
  Typography,
  TextField,
  Button,
  Divider,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from "@mui/material"
import { Link } from "react-router-dom"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [gender, setGender] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(username, email, password, gender)
  }

  return (
    // Body
    <Box
      sx={{
        backgroundColor: "#F9FAFB",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Container */}
      <Box
        sx={{
          backgroundColor: "white",
          width: 1100,
          height: 650,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderRadius: "10px",
          boxShadow: "2px 2px 15px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        {/*Left side */}
        <Box
          sx={{
            height: "100%",
            paddingLeft: "20px",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="images/login.jpg" alt="" />
        </Box>

        {/*Right side */}
        <Box
          className=""
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            textAlign: "left",
            padding: "10px 30px",
          }}
        >
          <Typography variant="h1" className="px-14" sx={{ marginY: 2 }}>
            Signup
          </Typography>

          <form className="w-full px-14" onSubmit={handleSubmit}>

            {/* Username */}
            <TextField
              label="Username"
              type="text"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              required
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Email */}
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Gender */}
            <FormControl fullWidth margin="normal">
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            {/* Submit button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginY: "15px",
              }}
            >
              Sign up
            </Button>
          </form>

          <Divider sx={{ my: 3, px: 10, color: "gray" }}>
            <Typography variant="p">OR</Typography>
          </Divider>

          <Typography variant="caption" sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              className="underline text-blue-500 hover:text-blue-600"
              to="/login"
            >
              Log in to your account
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Signup
