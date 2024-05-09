import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

const CheckIn = () => {
    const [attendanceStatus, setAttendanceStatus] = useState("pending");
    const [buttonColor, setButtonColor] = useState("blue")
    const [text, setText] = useState("Check In")

    const handleClick = () => {
        setAttendanceStatus("present")
        setButtonColor("green")
        setText("Checked In")
    }


    return (
        <Box sx={{
          marginBottom: 3,
          display: "flex",
        }}>
          <Button variant='outlined' onClick={handleClick}
             sx={{
              fontSize: "0.9rem",
            borderColor: `${buttonColor}`,
            color: `${buttonColor}`,
            '&:hover': {
                borderColor: `${buttonColor}`
              }
            }}>
            {text}
          </Button>
        </Box>
      );
};

export default CheckIn;