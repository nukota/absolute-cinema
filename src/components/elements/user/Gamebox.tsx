import { Box, Drawer, IconButton, Typography, Fab } from "@mui/material";
import { Close, SportsEsports } from "@mui/icons-material";
import { useState, useEffect } from "react";
import FlappyBirdGame from "./FlappyBirdGame";

const Gamebox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Keyboard shortcut to toggle gamebox (G key)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Check if G key is pressed and not in an input field
      if (
        e.key === "g" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      {/* Floating Game Button */}
      <Fab
        color="primary"
        aria-label="games"
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          bottom: 88, // Position above the chatbot Fab
          right: 24,
          zIndex: 1000,
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          color: "white",
          boxShadow: "none",
          "&:hover": {
            background: "rgba(0, 0, 0, 0.7)",
            transform: "scale(1.1)",
          },
          transition: "all 0.3s ease",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <SportsEsports sx={{ fontSize: 32 }} />
      </Fab>

      {/* Game Drawer */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 400 },
            maxWidth: "100%",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background:
              "radial-gradient(ellipse at top, rgba(156, 39, 176, 0.08) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.1) 0%, transparent 50%), linear-gradient(180deg, #2a184b 0%, #24335a 50%, #2a184b 100%)",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 1.5,
              background: "transparent",
              color: "white",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      letterSpacing: 0.5,
                      mb: 0.25,
                      fontSize: "1rem",
                      color: "#ffffff",
                    }}
                  >
                    Game Box
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.8,
                      fontSize: "0.75rem",
                      fontWeight: 400,
                      color: "#e0e0e0",
                    }}
                  >
                    Play games while you wait • Press G to toggle
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  color: "#ffffff",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    transform: "scale(1.05) rotate(90deg)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  width: 32,
                  height: 32,
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>

          {/* Content Container */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 1.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              bgcolor: "transparent",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(156, 39, 176, 0.4)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "rgba(156, 39, 176, 0.6)",
              },
            }}
          >
            <FlappyBirdGame isActive={isOpen} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Gamebox;
