import { createTheme } from '@mui/material/styles';

const userTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#ffd700',
    },
    background: {
      default: '#120318', // deep purple background
      paper: '#1b0526',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.8)',
    },
  },
});

export default userTheme;
