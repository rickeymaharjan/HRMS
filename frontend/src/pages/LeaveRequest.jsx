import { Typography, Box } from "@mui/material"
import RequestCard from "../components/RequestCard"
import LeaveRequestForm from "../components/LeaveRequestForm"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLeaveRequestsContext } from "../hooks/useLeaveRequestsContext"
import { useEffect } from "react"
import axios from "axios"

const LeaveRequest = () => {
  const { user } = useAuthContext()
  const { requests, dispatch } = useLeaveRequestsContext()

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`/api/leave/user`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch({ type: "SET_REQUEST", payload: response.data });
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    if (user.token) {
      fetchRequests();
    }
  }, [user, dispatch]);

  // Getting pending requests
  const pendingRequests = requests && requests.filter(request => request.status === "pending");

  return (
    <Box
      sx={{
        marginX: "0",
        height: "100%",
        overflow: "scroll",
        padding: "40px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {pendingRequests.length > 0 && (
        <>
          <Typography variant="h5" sx={{marginBottom: 2}}>Pending Request</Typography>
          {pendingRequests.map((request) => (
            <RequestCard key={request._id} request={request} />
          ))}
        </>
      )}

      <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="h5" sx={{marginTop: 2, marginBottom: 2}}>All Requests</Typography>
        <LeaveRequestForm />
      </Box>
        {requests && requests.filter(request => request.status !== "pending").map((request) => (
          <RequestCard key={request._id} request={request} />
        ))}
    </Box>
  )
}

export default LeaveRequest
