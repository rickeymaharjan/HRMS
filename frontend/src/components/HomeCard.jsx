// Cards.js
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

export default function Cards() {
    var showdate = new Date();
    var dt = showdate.toDateString();
    var displayTime = showdate.getHours() + ' : ' + showdate.getMinutes();
    const [changeColor, setChangeColor] = useState(false);
    const [buttonText, setButtonText] = useState("Check In");

    const handleClick = () => {
        setChangeColor(!changeColor);
        setButtonText(changeColor ? "Check In" : "Checked In");
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
            <div className="date">
            {dt}
            <br />
            {displayTime}
            </div>
            <button 
                onClick={handleClick} 
                className={`button-click ${(changeColor === true)? 'bg-gray-200' : 'bg-blue-200'}`}
            >
                {buttonText}
            </button>
            
            <Card sx={{ width: 200, height: 100,  marginTop: 0, display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: 1 }}>
                <CardContent>
                    <Typography variant="body2" component="div" color="text.secondary">
                        Active
                    </Typography>
                    <Typography variant="h2" component="div" style={{ color: "rgb(232,212,59)", fontSize: "2rem" }}>
                        200
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image="../images/check.png"
                    alt="Logo"
                    sx={{ width: "50px", height: "50px", margin: "auto" }}
                />
            </Card>
            <Card sx={{ width: 200, height: 100,  marginTop: 0, display: "flex", flexDirection: "ROW", justifyContent: "space-between", marginLeft: 1 }}>
                <CardContent>
                    <Typography variant="body2" component="div" color="text.secondary">
                    Checked In
                    </Typography>
                    <Typography variant="h2" component="div" style={{ color: "rgb(166,215,46)", fontSize: "2rem" }}>
                        400
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image="../images/checkedIn.png"
                    alt="Logo"
                    sx={{ width: "80px", height: "50px", margin: "auto" }}
                />
            </Card>
            <Card sx={{ width: 200, height: 100,  marginTop: 0, display: "flex", flexDirection: "ROW", justifyContent: "space-between", marginLeft: 1 }}>
                <CardContent>
                    <Typography variant="body2" component="div" color="text.secondary">
                    On Leave
                    </Typography>
                    <Typography variant="h2" component="div" style={{ color: "rgb(194,0,0)", fontSize: "2rem" }}>
                        60
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image="../images/log-out.png"
                    alt="Logo"
                    sx={{ width: "60px", height: "50px", margin: "auto" }}
                />
            </Card>
            <Card sx={{ width: 200, height: 100,  marginTop: 0, display: "flex", flexDirection: "ROW", justifyContent: "space-between", marginLeft: 1 }}>
                <CardContent>
                    <Typography variant="body2" component="div" color="text.secondary">
                        Today Employees
                    </Typography>
                    <Typography variant="h2" component="div" style={{ color: "rgb(232,212,59)", fontSize: "2rem" }}>
                        200
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    image="../images/check.png"
                    alt="Logo"
                    sx={{ width: "50px", height: "50px", margin: "auto" }}
                />
            </Card>
        </Box>
    );
};
