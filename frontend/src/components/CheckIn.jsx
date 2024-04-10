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
          marginBottom: 4,
          display: "flex",
          justifyContent: "flex-end"
        }}>
          <Button variant='outlined' onClick={handleClick}
             sx={{
            borderColor: `${buttonColor}`,
            color: `${buttonColor}`,
            '&:hover': {
                borderColor: `${buttonColor}` // Optional: This maintains transparency even on hover
              }
            }}>
            {text}
          </Button>
        </Box>
      );
};

export default CheckIn;