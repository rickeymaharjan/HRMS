import { Paper, Typography, Box } from "@mui/material";
import { Container } from "@mui/system";
import FullFeaturedCrudGrid from "../components/UserTable"
import AddRecord from "../components/AddRecord"


const Users = () => {

    return (
        <Container sx={{ display: "flex", flexDirection: "column", }}>
            <Typography sx={{ paddingLeft:0 , marginTop:3 }} variant="h3">
                    Employees
                </Typography>
          
            <Paper
                elevation={0}
                sx={{
                    padding: 2,
                    paddingBottom: 2,
                    borderRadius: "2px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.00999)",
                    boxSizing: "border-box",
                    width: "100%",
                    marginTop: 4,
        

                }}
            >
                  <AddRecord/>
                
                <Box
                    sx={{
                        marginTop: 1,
                        width: "100%",
                        height: "100%",
                        overflow: "auto", 
                    }}

                >
                <FullFeaturedCrudGrid/>
                </Box>
            </Paper>

        </Container>
    );
};

export default Users;