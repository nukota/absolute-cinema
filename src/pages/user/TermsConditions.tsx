import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import { Gavel } from '@mui/icons-material';

const TermsConditions = () => {
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
            <Gavel sx={{ fontSize: 80, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h2" fontWeight={700} gutterBottom>
              Terms & Conditions
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Last updated: October 31, 2025
            </Typography>
          </Box>

          <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

          {/* Content */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              1. Acceptance of Terms
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              By accessing and using Absolute Cinema's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              2. Ticket Booking and Purchase
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              2.1. All ticket bookings are subject to availability and acceptance by Absolute Cinema.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              2.2. Prices are subject to change without notice, but bookings already made will not be affected.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              2.3. You must provide accurate and complete information when making a booking.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              2.4. Once a booking is confirmed, you will receive a confirmation email with your booking details.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              3. Cancellations and Refunds
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              3.1. Cancellations must be made at least 2 hours before the scheduled showtime to qualify for a full refund.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              3.2. Cancellations made within 2 hours of showtime are not eligible for refunds.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              3.3. Refunds will be processed to the original payment method within 5-7 business days.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              3.4. In case of technical issues or cinema closures, full refunds will be provided regardless of timing.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              4. Cinema Admission
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              4.1. You must present your booking confirmation (digital or printed) at the cinema entrance.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              4.2. Valid identification may be required for age-restricted movies.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              4.3. Absolute Cinema reserves the right to refuse admission to anyone without providing a reason.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              4.4. Late arrivals may not be admitted after the movie has started, depending on cinema policy.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              5. User Account
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              5.1. You are responsible for maintaining the confidentiality of your account credentials.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              5.2. You must notify us immediately of any unauthorized use of your account.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              5.3. You are responsible for all activities that occur under your account.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              6. Prohibited Activities
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              6.1. You may not use our service for any illegal or unauthorized purpose.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              6.2. You may not attempt to gain unauthorized access to our systems or networks.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              6.3. Resale of tickets for profit is strictly prohibited.
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              6.4. You may not use automated systems or software to book tickets in bulk.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              7. Limitation of Liability
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              Absolute Cinema shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              8. Changes to Terms
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 3 }}>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service following the posting of changes constitutes acceptance of those changes.
            </Typography>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
              9. Contact Information
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              If you have any questions about these Terms & Conditions, please contact us at:
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
              Email: legal@absolutecinema.com
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Phone: 1-800-CINEMA
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsConditions;
