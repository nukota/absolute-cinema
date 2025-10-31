import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import { PrivacyTip } from '@mui/icons-material';

const PrivacyPolicy = () => {
  return (
    <Box
      sx={{
        background:
          'radial-gradient(ellipse at top, rgba(156, 39, 176, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(156, 39, 176, 0.2) 0%, transparent 50%), linear-gradient(180deg, #1a0a2e 0%, #16213e 50%, #1a0a2e 100%)',
        minHeight: '100vh',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 4,
            background: 'linear-gradient(135deg, #4a148c 0%, #543468 100%)',
            color: 'white',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <PrivacyTip sx={{ fontSize: 80, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h2" fontWeight={700} gutterBottom>
              Privacy Policy
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Last updated: October 31, 2025
            </Typography>
          </Box>

          <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

          {/* Content */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              1. Introduction
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              At Absolute Cinema, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. Please read this policy carefully to understand our views and practices regarding your personal data.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              2. Information We Collect
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              <strong>2.1. Personal Information:</strong> We may collect personal information that you provide to us, including but not limited to:
            </Typography>
            <Box sx={{ pl: 3, mb: 2 }}>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Name, email address, and phone number
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Payment information (credit card details, billing address)
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Date of birth (for age-restricted content)
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Booking history and preferences
              </Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              <strong>2.2. Automatically Collected Information:</strong> We automatically collect certain information when you use our services:
            </Typography>
            <Box sx={{ pl: 3, mb: 3 }}>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • IP address, browser type, and operating system
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Pages viewed and links clicked
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Date and time of your visit
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Cookies and similar tracking technologies
              </Typography>
            </Box>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              3. How We Use Your Information
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              We use the information we collect for the following purposes:
            </Typography>
            <Box sx={{ pl: 3, mb: 3 }}>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • To process and fulfill your ticket bookings
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • To communicate with you about your bookings and provide customer support
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • To send promotional emails and marketing communications (with your consent)
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • To improve our website and services
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • To detect and prevent fraud and security issues
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • To comply with legal obligations
              </Typography>
            </Box>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              4. How We Share Your Information
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              We may share your information with:
            </Typography>
            <Box sx={{ pl: 3, mb: 3 }}>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Cinema partners to facilitate your bookings
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Payment processors to handle transactions securely
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Service providers who assist us in operating our website
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Law enforcement or regulatory authorities when required by law
              </Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              We do not sell your personal information to third parties.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              5. Cookies and Tracking Technologies
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our services.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              6. Data Security
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              7. Data Retention
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Booking history and transaction records are typically retained for 7 years for legal and accounting purposes.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              8. Your Rights
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              You have the following rights regarding your personal information:
            </Typography>
            <Box sx={{ pl: 3, mb: 3 }}>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Access: Request a copy of the personal information we hold about you
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Correction: Request correction of inaccurate or incomplete information
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Deletion: Request deletion of your personal information
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Opt-out: Unsubscribe from marketing communications at any time
              </Typography>
              <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}>
                • Data portability: Request your data in a structured, machine-readable format
              </Typography>
            </Box>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              9. Children's Privacy
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              10. Changes to This Privacy Policy
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes are posted constitutes acceptance of the updated policy.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              11. Contact Us
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
              Email: privacy@absolutecinema.com
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Phone: 1-800-CINEMA
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Address: 123 Cinema Street, Movie City, MC 12345
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
