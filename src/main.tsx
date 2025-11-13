import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { FeedbackProvider } from './provider/FeedbackProvider';
import { QueryProvider } from './provider/QueryProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0', // Purple color
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: "'Nunito', sans-serif",
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* ensures consistent base styles */}
        <FeedbackProvider>
          <App />
        </FeedbackProvider>
      </ThemeProvider>
    </QueryProvider>
  </StrictMode>,
)
