import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Person, History, Edit, Save, Cancel } from "@mui/icons-material";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../services/authService";
import {
  useUserProfile,
  useUpdateCustomer,
} from "../../services/customersService";
import { useFeedback } from "../../provider/FeedbackProvider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const { showSnackbar } = useFeedback();

  const { data: currentUser } = useCurrentUser();
  const customerId = currentUser?.id;

  const { data: profile, isLoading: profileLoading } = useUserProfile(
    customerId || ""
  );
  const updateCustomerMutation = useUpdateCustomer();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    cccd: "",
    dob: "",
  });

  // Update form data when profile loads
  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name,
        email: profile.email,
        phone: profile.phone || "",
        cccd: profile.cccd || "",
        dob: profile.date_of_birth || "",
      });
    }
  }, [profile]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      if (customerId) {
        updateCustomerMutation.mutate(
          {
            id: customerId,
            data: {
              phone_number: formData.phone,
              cccd: formData.cccd,
              dob: formData.dob,
            },
          },
          {
            onSuccess: () => {
              showSnackbar({
                message: "Profile updated successfully!",
                severity: "success",
              });
              setIsEditing(false);
            },
            onError: () => {
              showSnackbar({
                message: "Failed to update profile. Please try again.",
                severity: "error",
              });
            },
          }
        );
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        full_name: profile.full_name,
        email: profile.email,
        phone: profile.phone || "",
        cccd: profile.cccd || "",
        dob: profile.date_of_birth || "",
      });
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (profileLoading) {
    return (
      <Box
        sx={{
          background:
            "radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#ffd700" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background:
          "radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)",
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700} gutterBottom color="white">
          My Profile
        </Typography>
        <Typography
          variant="body1"
          color="rgba(255, 255, 255, 0.7)"
          sx={{ mb: 4 }}
        >
          Manage your account and view booking history
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "300px 1fr" },
            gap: 3,
          }}
        >
          {/* Profile Sidebar */}
          <Paper
            sx={{
              p: 3,
              height: "fit-content",
              background: "linear-gradient(135deg, #3a0a7c 0%, #543468 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  bgcolor: "#ffd700",
                  color: "#4a148c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  margin: "0 auto 16px",
                }}
              >
                {profile?.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("") || "?"}
              </Box>
              <Typography variant="h6" fontWeight={600} sx={{ color: "white" }}>
                {profile?.full_name || "Loading..."}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                {profile?.email || ""}
              </Typography>
            </Box>

            <Divider sx={{ my: 2, bgcolor: "rgba(255,255,255,0.3)" }} />

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Member Since
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ color: "white" }}
              >
                {profile?.member_since
                  ? new Date(profile.member_since).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.7)" }}
              >
                Total Bookings
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ color: "white" }}
              >
                {profile?.total_bookings || 0}
              </Typography>
            </Box>
          </Paper>

          {/* Main Content */}
          <Paper
            sx={{
              background: "linear-gradient(135deg, #3a0a7c 0%, #6d5e53 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              sx={{
                borderBottom: 1,
                borderColor: "rgba(255,255,255,0.3)",
                px: 3,
                "& .MuiTab-root": {
                  color: "rgba(255,255,255,0.7)",
                  "&.Mui-selected": {
                    color: "white",
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "white",
                },
              }}
            >
              <Tab icon={<Person />} label="Account" />
              <Tab icon={<History />} label="Booking History" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ px: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight={600} color="white">
                    Account Information
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {isEditing ? (
                      <>
                        <IconButton
                          onClick={handleEditToggle}
                          disabled={updateCustomerMutation.isPending}
                          sx={{
                            color: "white",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                          }}
                        >
                          <Save />
                        </IconButton>
                        <IconButton
                          onClick={handleCancel}
                          disabled={updateCustomerMutation.isPending}
                          sx={{
                            color: "white",
                            "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                          }}
                        >
                          <Cancel />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        onClick={handleEditToggle}
                        disabled={profileLoading}
                        sx={{
                          color: "white",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                        }}
                      >
                        <Edit />
                      </IconButton>
                    )}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 3,
                    mb: 3,
                  }}
                >
                  {/* Full Name - Read Only */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        display: "block",
                        mb: 1,
                      }}
                    >
                      Full Name
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "white", fontWeight: 500 }}
                    >
                      {formData.full_name}
                    </Typography>
                  </Box>

                  {/* Email - Read Only */}
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "rgba(255,255,255,0.7)",
                        display: "block",
                        mb: 1,
                      }}
                    >
                      Email
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "white", fontWeight: 500 }}
                    >
                      {formData.email}
                    </Typography>
                  </Box>

                  {/* Phone Number */}
                  <TextField
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                    sx={{
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "rgba(255,255,255,0.3)",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                      },
                    }}
                  />

                  {/* Date of Birth */}
                  <TextField
                    label="Date of Birth"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "rgba(255,255,255,0.3)",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                      },
                    }}
                  />

                  {/* CCCD */}
                  <TextField
                    label="CCCD (ID)"
                    value={formData.cccd}
                    onChange={(e) => handleInputChange("cccd", e.target.value)}
                    disabled={!isEditing}
                    variant={isEditing ? "outlined" : "standard"}
                    sx={{
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiInputLabel-root": {
                        color: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                        "&:hover fieldset": {
                          borderColor: "rgba(255,255,255,0.5)",
                        },
                        "&.Mui-focused fieldset": { borderColor: "white" },
                      },
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "rgba(255,255,255,0.3)",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "rgba(255,255,255,0.5)",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "white",
                      },
                    }}
                  />
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ px: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  sx={{ color: "white" }}
                >
                  Booking History
                </Typography>
                {profile?.booking_history &&
                profile.booking_history.length === 0 ? (
                  <Box sx={{ textAlign: "center", py: 6 }}>
                    <Typography
                      variant="body1"
                      sx={{ color: "rgba(255,255,255,0.7)" }}
                      gutterBottom
                    >
                      No bookings yet
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/movies")}
                      sx={{
                        mt: 2,
                        bgcolor: "#ffd700",
                        color: "#4a148c",
                        "&:hover": { bgcolor: "#e6c300" },
                      }}
                    >
                      Browse Movies
                    </Button>
                  </Box>
                ) : (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {profile?.booking_history?.map((booking) => (
                      <Card
                        key={booking.booking_id}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.1)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: 2,
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {/* Date on top */}
                            <Typography
                              variant="body2"
                              sx={{ color: "rgba(255,255,255,0.7)" }}
                            >
                              {new Date(booking.showtime).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                              , {booking.cinema_name}
                            </Typography>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              sx={{ color: "white" }}
                            >
                              {booking.movie_title}
                            </Typography>

                            {/* Seats and Total in a row */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "rgba(255,255,255,0.7)" }}
                                >
                                  Seats: {booking.seats.join(", ")}
                                </Typography>
                              </Box>
                              <Box sx={{ textAlign: "right" }}>
                                <Typography
                                  variant="body1"
                                  fontWeight={600}
                                  sx={{ color: "#ffd700" }}
                                >
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(booking.total_price)}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                )}
              </Box>
            </TabPanel>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
