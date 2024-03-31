import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <Box height={80} />
      <Box sx={{ display: "flex" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Card 1
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is the content of card 1.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Card 2
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is the content of card 2.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Card 3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is the content of card 3.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box height={20} />

          {/* Use Stack component to arrange the bottom two cards side by side */}
          <Stack direction="row" spacing={2}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={505559}>
                <Card sx={{ maxWidth: 50000 + "%", height: 405 }}>
                  <CardContent>{/* Content for the larger card */}</CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item xs={12} md={15}>
                <Card sx={{ height: "60vh" }}>
                  <CardContent>
                    {/* Content for the smaller card */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
