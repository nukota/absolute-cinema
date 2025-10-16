import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: "'Nunito', sans-serif",
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ThemeProvider theme={theme}>
      <CssBaseline /> {/* ensures consistent base styles */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)
