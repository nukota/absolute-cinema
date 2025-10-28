import { useState } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/elements/NavBar";
import { Header } from "../../components/elements/Header";

const drawerWidth = 250;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F0F0F0" }}>
      {/* Permanent Drawer for Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            borderRight: 1,
            borderColor: "divider",
            // boxShadow: '4px 0 8px rgba(0,0,0,0.08)'
          },
        }}
        open
      >
        <NavBar />
      </Drawer>

      {/* Temporary Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <NavBar />
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
        }}
      >
        <Box sx={{ position: "relative", overflowY: "visible" }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "block", md: "none" },
              position: "absolute",
              left: 16,
              top: 0,
              zIndex: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Header />
        </Box>

        {/* Page Content */}
        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            boxShadow: "inset 4px 4px 10px rgba(0, 0, 0, 0.16)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
