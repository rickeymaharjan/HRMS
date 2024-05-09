import { Paper, Box, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const Calendar = () => {
    return (
        <Paper elevation={0} sx={{
            padding: 3,
            height: "100%",
            flex: 1.5,
            borderRadius: "15px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.00999)"
        }}>
            <Typography sx={{paddingLeft: 2}} variant="h5">Calendar</Typography>

            {/* Calendar */}
            <Box sx={{ height: "100%" , display: "flex", justifyContent: "center", alignItems: "center" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>
            </Box>
        </Paper>
    )
}

export default Calendar;
