import React, { createContext, useContext, useState, useMemo } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { translations } from "../utils/lang";

type ThemeMode = "light" | "dark";
type Language = "en" | "vn";

interface ThemeContextType {
  mode: ThemeMode;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [language, setLanguage] = useState<Language>("en");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return language === "en" ? translation[0] : translation[1];
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#9c27b0" : "#ba68c8",
            light: "#ba68c8",
            dark: "#7b1fa2",
            contrastText: "#fff",
          },
          secondary: {
            main: mode === "light" ? "#f50057" : "#ff4081",
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
        },
        typography: {
          fontFamily: "'Nunito', sans-serif",
        },
      }),
    [mode]
  );

  const value = useMemo(
    () => ({
      mode,
      language,
      toggleTheme,
      setLanguage,
      t,
    }),
    [mode, language]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
