import { Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"

const RequestCard = ({ request }) => {
    const getStatusColor = (status) => {
        if (status === 'approved') {
            return '#558833'; 
        } else if (status === 'pending') {
            return '#BBBBBB';
        } else {
            return '#FF0000';
        }
    };

    return (
        <Paper elevation={0} sx={{
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "150px",
              padding: 2,
              paddingX: 5.5,
              marginBottom: 1
        }}>
            <Box>
                <Typography variant="h6" sx={{marginBottom: 1}}>{request.title}</Typography>
                <Typography variant="subtitle1"><strong>Duration: </strong> 27 jan to 12 feb</Typography>
                <Typography variant="subtitle1"><strong>Description: </strong>{request.description}</Typography>
                {request.reviewedBy && <Typography variant="subtitle1"><strong>Reviewed by: </strong> {request.reviewedBy}</Typography>}
                <Typography variant="time">5 minutes ago</Typography>
                
            </Box>

            <Box>
                <Typography variant="subtitle1" sx={{
                    background: getStatusColor(request.status),
                    paddingY: 0.5,
                    paddingX: 2,
                    color: "white",
                    borderRadius: "50px"
                    }}>{request.status}</Typography>
            </Box>
            
        </Paper>
    )
}

export default RequestCard