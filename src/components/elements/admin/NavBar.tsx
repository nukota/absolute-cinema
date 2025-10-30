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
  SettingsRounded,
  MeetingRoomRounded,
  ShoppingCartRounded,
  ReceiptRounded,
  LocationOnRounded,
  CalendarViewDayRounded,
  StarRounded,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { text: "Dashboard", icon: <DashboardRounded />, path: "/admin" },
  { text: "Cinemas", icon: <LocationOnRounded />, path: "/admin/cinemas" },
  { text: "Rooms", icon: <MeetingRoomRounded />, path: "/admin/rooms" },
  { text: "Movies", icon: <MovieRounded />, path: "/admin/movies" },
  {
    text: "Showtimes",
    icon: <CalendarViewDayRounded />,
    path: "/admin/showtimes",
  },
  { text: "Customers", icon: <PeopleRounded />, path: "/admin/customers" },
  { text: "Products", icon: <ShoppingCartRounded />, path: "/admin/products" },
  { text: "Invoices", icon: <ReceiptRounded />, path: "/admin/invoices" },
  { text: "Ratings", icon: <StarRounded />, path: "/admin/ratings" },
];

const settingsItem: NavItem = {
  text: "Settings",
  icon: <SettingsRounded />,
  path: "/admin/settings",
};

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
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          height: { xs: 60, sm: 66 },
          px: 3,
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
            fontWeight: 500,
            color: "primary.main",
          }}
        >
          Absolute Cinema
        </Typography>
      </Box>

      {/* Navigation Items */}
      <List sx={{ flex: 1, pt: 2, overflow: "auto" }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                px: 2,
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
                  fontSize: "1.125rem",
                  fontWeight: isActive(item.path) ? 800 : 700,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Settings Item at Bottom */}
      <List sx={{ pt: 0 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate(settingsItem.path)}
            sx={{
              mx: 1,
              px: 2,
              borderRadius: 1,
              backgroundColor: isActive(settingsItem.path)
                ? "rgba(156, 39, 176, 0.08)"
                : "transparent",
              color: isActive(settingsItem.path)
                ? "primary.main"
                : "text.primary",
              "&:hover": {
                backgroundColor: isActive(settingsItem.path)
                  ? "rgba(156, 39, 176, 0.12)"
                  : "action.hover",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: isActive(settingsItem.path)
                  ? "primary.main"
                  : "text.secondary",
              }}
            >
              {settingsItem.icon}
            </ListItemIcon>
            <ListItemText
              primary={settingsItem.text}
              primaryTypographyProps={{
                fontSize: "1.125rem",
                  fontWeight: isActive(settingsItem.path) ? 800 : 700,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Footer */}
      <Box
        sx={{
          p: 1,
          m: 2,
          mt: 0,
          borderRadius: 1,
          backgroundColor: "rgba(156, 39, 176, 0.02)",
          border: "1px solid rgba(156, 39, 176, 0.1)",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: "primary.main",
            fontWeight: 600,
            display: "block",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          This application was developed by group 0
        </Typography>
      </Box>
    </Box>
  );
};
