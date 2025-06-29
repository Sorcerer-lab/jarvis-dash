// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// 🔮 Orbitron font (already in your public/index.html or index.html equivalent)
const theme = createTheme({palette: {
    mode: 'dark',
    background: {
      default: '#0e0e1a',
      paper: '#1c1c2b',
    },
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#9c27b0',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: `'Orbitron', sans-serif`,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* sets up base dark styling */}
    <App />
  </ThemeProvider>
);
