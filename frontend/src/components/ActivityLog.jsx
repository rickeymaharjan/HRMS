import { Box, Paper, Typography } from "@mui/material";

const ActivityLog = () => {
    return (
        <Paper elevation={0} sx={{
            padding: 3,
            flex: 3,
            borderRadius: "15px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.00999)",
            boxSizing: "border-box"
        }}>
            <Typography sx={{paddingLeft: 1}} variant="h4">Activity log</Typography>

            {/* Activity logs */}
            <Box sx={{
                width: "100%",
                height: "100%",
            }}>

            </Box>
        </Paper>
    )
}

export default ActivityLog