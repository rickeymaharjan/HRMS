import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from "./context/AuthContext"

import { ThemeProvider } from '@mui/material/styles';
import Theme from './theme/theme.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider  theme={Theme}>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthContextProvider>
  </ThemeProvider>
)
