import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  MovieFilterOutlined,
  DashboardRounded,
  MovieRounded,
  PeopleRounded,
  TheaterComedyRounded,
  SettingsRounded,
  BusinessRounded,
  MeetingRoomRounded,
  ShoppingCartRounded,
  ReceiptRounded,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { text: "Dashboard", icon: <DashboardRounded />, path: "/admin" },
  { text: "Movies", icon: <MovieRounded />, path: "/admin/movies" },
  {
    text: "Showtimes",
    icon: <TheaterComedyRounded />,
    path: "/admin/showtimes",
  },
  { text: "Cinemas", icon: <BusinessRounded />, path: "/admin/cinemas" },
  { text: "Rooms", icon: <MeetingRoomRounded />, path: "/admin/rooms" },
  { text: "Customers", icon: <PeopleRounded />, path: "/admin/customers" },
  { text: "Products", icon: <ShoppingCartRounded />, path: "/admin/products" },
  { text: "Invoices", icon: <ReceiptRounded />, path: "/admin/invoices" },
  { text: "Settings", icon: <SettingsRounded />, path: "/admin/settings" },
];

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };
  return (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 4px rgba(0,0,0,0.08)",
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <MovieFilterOutlined sx={{ fontSize: 20, color: "primary.main" }} />
        <Typography
          sx={{
            fontFamily: '"Montserrat Alternates", sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          Absolute Cinema
        </Typography>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flex: 1, pt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                borderRadius: 1,
                backgroundColor: isActive(item.path)
                  ? "rgba(156, 39, 176, 0.08)"
                  : "transparent",
                color: isActive(item.path) ? "primary.main" : "text.primary",
                "&:hover": {
                  backgroundColor: isActive(item.path)
                    ? "rgba(156, 39, 176, 0.12)"
                    : "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: isActive(item.path)
                    ? "primary.main"
                    : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: isActive(item.path) ? 700 : 600,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
