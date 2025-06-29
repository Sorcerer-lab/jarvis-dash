import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/orbitron';

const theme = createTheme({
  typography: {
    fontFamily: 'Orbitron, sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff',
    },
    background: {
      default: '#0a0f1c',
      paper: '#111827',
    },
  },
});

const CustomThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

export default CustomThemeProvider;

