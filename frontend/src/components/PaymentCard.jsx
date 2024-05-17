import { Paper, Box, Typography, Button } from "@mui/material"
import { differenceInDays, parseISO } from 'date-fns';

const PaymentCard = ({ user }) => {
  const lastPaidDate = parseISO(user.lastPaid);
  const currentDate = new Date();

  // Calculating the number of days since lastPaid
  const daysSinceLastPaid = differenceInDays(currentDate, lastPaidDate);

  // Calculating the daily salary rate
  const dailySalary = user.salary / 30; // Assuming salary is monthly

  // Calculating the amount due
  const amountDue = dailySalary * daysSinceLastPaid;


    return (
      <Paper
        elevation={0}
        sx={{
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "150px",
          padding: 2,
          paddingX: 5.5,
          marginBottom: 1,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{marginBottom: 1}}>{user.username}</Typography>
          <Typography variant="subtitle1"><strong>Salary: </strong>{user.salary}</Typography>
          <Typography variant="subtitle1"><strong>Amount Due: </strong>Rs {amountDue.toFixed(2)}</Typography>
          <Typography variant="subtitle1"><strong>Last paid: </strong>{lastPaidDate.toDateString()}</Typography>
        </Box>

        <Button variant="outlined" size="small" color="success">Pay employee</Button>
      </Paper>
    )
  }

export default PaymentCard