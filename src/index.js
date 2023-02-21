import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

export const secondaryColour = '#FFFFFF';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B25F5B',
    },
    secondary: {
      main: '#000000',
    },
    info: {
      main: '#F7C873',
    },
    text:{
      disabled: '#000000',
    },
    error:{
      main: '#c71e1e',
    },
    warning:{
      main: '#ff8c00'
    },
    success:{
      main: '#32cd32'
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

