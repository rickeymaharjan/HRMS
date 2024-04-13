import { Paper, Typography, Box } from "@mui/material"

const InfoCard = ({title, amount, img}) => {
    return(
        <Paper elevation={0} sx={{
            display: "flex",
            flex: 1,
            height: "150px",
            alignItems: "center",
            borderRadius: "15px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.00999)"
        }}>
            <Box sx={{
                height: "60px",
                width: "120px",
                borderRadius: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                // backgroundColor: "gray"

            }}><img width="65" height="65" src={img}/></Box>
            <Box sx={{
            }}>
                <Typography variant="h3">{amount}</Typography>
                <Typography variant="subtitle2">{title}</Typography>
            </Box>
        </Paper>
    )
}

export default InfoCard