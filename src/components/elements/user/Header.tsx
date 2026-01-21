import {
  Box,
  Container,
  IconButton,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import {
  SearchRounded,
  Movie,
  ArrowForward,
  BookmarkRounded,
  Mic,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileMenu from "../../popovers/ProfileMenu";
import { useSignOut, useCurrentUser } from "../../../services/authService";
import { startVoiceSearch } from "../../../utils/helper/voiceHelper";
import { useTheme } from "../../../provider/ThemeProvider";
import vnFlag from "../../../assets/images/vn.png";
import enFlag from "../../../assets/images/en.png";
import { Rabbit } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const open = Boolean(anchorEl);
  const { mutate: signOutMutate } = useSignOut();
  const { data: user } = useCurrentUser();
  const { language, setLanguage } = useTheme();
  console.log("Current User in Header:", user);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleAdminPage = () => {
    handleClose();
    navigate("/admin");
  };

  const handleLogout = () => {
    handleClose();
    signOutMutate(undefined, {
      onSettled: () => {
        // Navigate to signin after cleanup (handled in authService)
        navigate("/signin");
      },
    });
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleVoiceSearch = () => {
    startVoiceSearch({
      onResult: (transcript) => {
        setSearchQuery(transcript);
        setIsListening(false);
        // Auto-search after voice input
        if (transcript.trim()) {
          navigate(`/movies?search=${encodeURIComponent(transcript.trim())}`);
          setSearchOpen(false);
          setSearchQuery("");
        }
      },
      onError: (error) => {
        console.error("Voice search error:", error);
        setIsListening(false);
        alert("Voice search failed. Please try again or use text search.");
      },
      onStart: () => setIsListening(true),
      onEnd: () => setIsListening(false),
    });
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2,
            px: { xs: 2, sm: 0 },
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              color: "white",
            }}
            onClick={() => navigate("/")}
          >
            <Rabbit size={32} color="white" />
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Montserrat Alternates", sans-serif',
                fontWeight: 700,
                display: { xs: "none", sm: "block" },
                color: "white",
              }}
            >
              Absolute Cinema
            </Typography>
          </Box>

          {/* Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Search Field */}
            {searchOpen && (
              <TextField
                size="small"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleVoiceSearch}
                        edge="end"
                        size="small"
                        sx={{
                          mr: 0.5,
                          color: isListening ? "error.main" : "inherit",
                        }}
                        disabled={isListening}
                      >
                        <Mic />
                      </IconButton>
                      <IconButton
                        onClick={handleSearch}
                        edge="end"
                        size="small"
                        disabled={!searchQuery.trim()}
                      >
                        <ArrowForward />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 160 }}
              />
            )}

            {/* Search Button - hidden on md and smaller */}
            <IconButton
              onClick={handleSearchToggle}
              sx={{
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
                display: { xs: "none", md: "none", lg: "inline-flex" },
              }}
            >
              <SearchRounded />
            </IconButton>

            {/* Saved Movies Button */}
            <IconButton
              onClick={() => navigate("/saved-movies")}
              sx={{
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <BookmarkRounded />
            </IconButton>

            {/* Movies Button */}
            <IconButton
              onClick={() => navigate("/movies")}
              sx={{
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <Movie />
            </IconButton>

            {/* Language Selector */}
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "vn")}
              renderValue={(value) => (
                <Avatar
                  src={value === "en" ? enFlag : vnFlag}
                  sx={{ width: 24, height: 24 }}
                />
              )}
              sx={{
                color: "white",
                "& .MuiSelect-icon": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                minWidth: 50,
              }}
            >
              <MenuItem value="en">
                <Avatar src={enFlag} sx={{ width: 20, height: 20, mr: 1 }} />
                ENG
              </MenuItem>
              <MenuItem value="vn">
                <Avatar src={vnFlag} sx={{ width: 20, height: 20, mr: 1 }} />
                VIE
              </MenuItem>
            </Select>

            {/* User Info and Avatar */}
            {user ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    textAlign: "right",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      fontSize: "0.875rem",
                    }}
                  >
                    {user.full_name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontSize: "0.75rem",
                    }}
                  >
                    {user.email}
                  </Typography>
                </Box>
                <IconButton onClick={handleClick} size="small">
                  <Avatar
                    sx={{ width: 40, height: 40, bgcolor: "secondary.main" }}
                  >
                    {user.full_name?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => navigate("/signin")}
                sx={{
                  color: "white",
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  px: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Sign In
                </Typography>
              </IconButton>
            )}
          </Box>

          {/* Profile Menu */}
          <ProfileMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onProfile={handleProfile}
            onAdminPage={handleAdminPage}
            onLogout={handleLogout}
            userRole={user?.role || "customer"}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
