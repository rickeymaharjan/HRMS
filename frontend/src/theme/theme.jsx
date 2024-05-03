import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  typography: {
    fontFamily: [
      "Noto Sans", // Replace with your preferred font stack
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "1rem",
    },
    subtitle2: {
      fontSize: "0.875rem",
      color: "gray"
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    button: {
      fontSize: "1rem",
      textTransform: "none",
    },
    caption: {
      fontSize: "0.9rem",
      color: "#707070"
    },
    overline: {
      fontSize: "0.75rem",
      textTransform: "uppercase",
    },
  },
})

export default Theme
