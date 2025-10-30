import { createTheme } from '@mui/material/styles';

const userTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0',
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
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default userTheme;
