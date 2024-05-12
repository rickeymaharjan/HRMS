import { Button, Paper, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { format } from 'date-fns';
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useAuthContext } from "../hooks/useAuthContext";
import { useLeaveRequestsContext } from "../hooks/useLeaveRequestsContext";
import axios from "axios";


const RequestCard = ({ request }) => {
    const { user } = useAuthContext()
    const { dispatch } = useLeaveRequestsContext()

    const startDate = format(new Date(request.startDate), 'MMMM d');
    const endDate = format(new Date(request.endDate), 'MMMM d');

    const getStatusColor = (status) => {
        if (status === 'approved') {
            return '#558833'; 
        } else if (status === 'pending') {
            return '#BBBBBB';
        } else {
            return '#FF0000';
        }
    };

    const handleApprove = () => {
        console.log("request approved")
    }

    const handleReject = () => {
        try {
            axios.patch(`/api/leave/${request._id}`, {status: "rejected", reviewedBy: user.username}, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then(response => {
              dispatch({ type: "UPDATE_REQUEST", payload: response.data });
            })
            .catch(error => {
              console.error("Error updating request:", error);
            });
          } catch (error) {
            console.error("Error updating requests:", error);
          }
    }

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
                {user.role == "manager" && <Typography variant="subtitle1"><strong>Employee: </strong>{request.username}</Typography>}
                <Typography variant="subtitle1"><strong>Duration: </strong>{startDate} to {endDate}</Typography>
                <Typography variant="subtitle1"><strong>Description: </strong>{request.description}</Typography>
                {request.reviewedBy && <Typography variant="subtitle1"><strong>Reviewed by: </strong> {request.reviewedBy}</Typography>}
                <Typography variant="time">{formatDistanceToNow(new Date(request.updatedAt), { addSuffix: true })}</Typography>
            </Box>

            <Box>
                {user.role != "manager" &&
                    <Typography variant="subtitle1" sx={{
                        background: getStatusColor(request.status),
                        paddingY: 0.5,
                        paddingX: 2,
                        color: "white",
                        borderRadius: "50px"
                        }}>{request.status}
                    </Typography>
                }

                {user.role == "manager" && 
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined" size="small" color="success" onClick={handleApprove}>Approve</Button>
                        <Button variant="outlined" size="small" color="error" onClick={handleReject}>Reject</Button>
                    </Stack>
                }

            </Box>
            
        </Paper>
    )
}

export default RequestCard