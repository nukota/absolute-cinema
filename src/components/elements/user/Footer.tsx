import { Box, Container, Typography } from "@mui/material";
import { MovieFilter } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../provider/ThemeProvider";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #4a148c 0%, #8d6e63 100%)",
        color: "white",
        py: 8,
        mt: "auto",
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
      }}
    >
      {/* Decorative Cinema Icon */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          opacity: 0.1,
          zIndex: 1,
        }}
      >
        <MovieFilter sx={{ fontSize: 200 }} />
      </Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
            gap: 6,
            mb: 6,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* About */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
              <MovieFilter sx={{ fontSize: 40, color: "white" }} />
              <Typography
                variant="h5"
                sx={{
                  width: 240,
                  fontFamily: '"Montserrat Alternates", sans-serif',
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Absolute Cinema
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ opacity: 0.9, color: "white", lineHeight: 1.6 }}
            >
              {t("footer.description")}
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
              color="white"
            >
              {t("footer.quickLinks")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  color: "white",
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                }}
                onClick={() => navigate("/movies")}
              >
                {t("footer.nowShowing")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  color: "white",
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                }}
                onClick={() => navigate("/movies")}
              >
                {t("footer.comingSoon")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  color: "white",
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                }}
                onClick={() => navigate("/profile")}
              >
                {t("footer.myBookings")}
              </Typography>
            </Box>
          </Box>

          {/* Customer Service */}
          <Box>
            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
              color="white"
            >
              {t("footer.customerService")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  color: "white",
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                }}
                onClick={() => navigate("/help-center")}
              >
                {t("footer.helpCenter")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  color: "white",
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                }}
                onClick={() => navigate("/terms-conditions")}
              >
                {t("footer.termsConditions")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  color: "white",
                  cursor: "pointer",
                  "&:hover": { opacity: 1 },
                }}
                onClick={() => navigate("/privacy-policy")}
              >
                {t("footer.privacyPolicy")}
              </Typography>
            </Box>
          </Box>

          {/* Contact */}
          <Box>
            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
              color="white"
            >
              {t("footer.contactUs")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body1" sx={{ opacity: 0.9, color: "white" }}>
                {t("footer.email")}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, color: "white" }}>
                {t("footer.phone")}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, color: "white" }}>
                {t("footer.hotline")}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: 1,
            borderColor: "rgba(255, 255, 255, 0.3)",
            pt: 4,
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography variant="body1" sx={{ opacity: 0.9, color: "white" }}>
            {t("footer.copyright")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
