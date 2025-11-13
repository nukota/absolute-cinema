import {
  Box,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Badge,
  Popover,
  Paper,
} from "@mui/material";
import {
  NotificationsRounded,
  AccountCircleRounded,
  SettingsRounded,
  LogoutRounded,
  MessageRounded,
  CalendarTodayRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [calendarAnchor, setCalendarAnchor] = useState<null | HTMLElement>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const open = Boolean(anchorEl);
  const calendarOpen = Boolean(calendarAnchor);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCalendarClick = (event: React.MouseEvent<HTMLElement>) => {
    setCalendarAnchor(event.currentTarget);
  };

  const handleCalendarClose = () => {
    setCalendarAnchor(null);
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        overflowX: "hidden",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: { xs: 1, lg: 2 },
          height: { xs: 60, sm: 66 },
          px: 3,
        }}
      >
        {/* Icon Buttons */}
        <IconButton color="default" sx={{ p: 1.25 }} onClick={handleCalendarClick}>
          <CalendarTodayRounded sx={{ fontSize: 24 }} />
        </IconButton>

        <IconButton color="default" sx={{ p: 1.25 }}>
          <MessageRounded sx={{ fontSize: 24 }} />
        </IconButton>

        <IconButton color="default" sx={{ p: 1.25 }}>
          <Badge badgeContent={3} color="error">
            <NotificationsRounded sx={{ fontSize: 28 }} />
          </Badge>
        </IconButton>

        {/* Profile Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ textAlign: "right" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              Admin User
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
              }}
            >
              admin@absolutecinema.com
            </Typography>
          </Box>
          <IconButton onClick={handleClick} size="small">
            <Avatar sx={{ width: 40, height: 40, bgcolor: "primary.main" }}>
              A
            </Avatar>
          </IconButton>
        </Box>

        {/* Calendar Popover */}
        <Popover
          open={calendarOpen}
          anchorEl={calendarAnchor}
          onClose={handleCalendarClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Paper elevation={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Paper>
        </Popover>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          slotProps={{
            paper: {
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 200,
              },
            },
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <AccountCircleRounded fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <SettingsRounded fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <LogoutRounded fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
