import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, TextField, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(email, password)
  }

  return (
    // Body
    <Box sx={{
       backgroundColor: "#F9FAFB", 
       width: '100vw', 
       height: '100vh', 
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center'
      }}>

      {/* Container */}
      <Box sx={{
        backgroundColor: "white",
        width: 1000,
        height: 600,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: '10px',
        boxShadow: '2px 2px 15px rgba(0, 0, 0, 0.1)',
        padding: '20px'
      }}>

        {/*Left side */}
        <Box sx={{
          height: "100%",
          paddingLeft: "20px",
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"

        }}>
          <img src="images/login.jpg" alt="" />


        </Box>

        {/*Right side */}
        <Box className="" sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          textAlign: "left",
          padding: "10px 30px",
        }}>

          <Typography variant='h1' className='px-14' sx={{marginY: 2}}>Login</Typography>

          <form className="w-full px-14" onSubmit={handleSubmit}>
            <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            size='small'
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            size='small'
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type='submit' variant='contained' fullWidth sx={{
            marginY: "15px"
          }}>Login</Button>

          </form>

          <Divider sx={{ my: 3, px: 10, color: 'gray'}}>
            <Typography variant="p">
              OR
            </Typography>
          </Divider>

          <Typography variant='caption' sx={{textAlign: 'center'}}>
            Are you new? <Link className='underline text-blue-500 hover:text-blue-600' to="/signup">Create an account</Link>
          </Typography>
        </Box>


      </Box>
    </Box>
  );
};

export default Login;


