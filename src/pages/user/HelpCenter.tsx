import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import { ExpandMore, Help } from '@mui/icons-material';

const HelpCenter = () => {
  const faqs = [
    {
      question: 'How do I book tickets?',
      answer:
        'To book tickets, browse our movie selection, choose your preferred showtime, select your seats, and complete the payment process. You will receive a confirmation email with your booking details.',
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer:
        'Yes, you can cancel or modify your booking up to 2 hours before the showtime. Go to your profile page, find your booking, and select the cancel or modify option. Refunds will be processed within 5-7 business days.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept various payment methods including credit cards (Visa, Mastercard, American Express), debit cards, and popular digital wallets like PayPal and Apple Pay.',
    },
    {
      question: 'Do I need to print my tickets?',
      answer:
        'No, you don\'t need to print your tickets. You can show your booking confirmation on your mobile device at the cinema entrance. However, printing is available if you prefer a physical copy.',
    },
    {
      question: 'What is your refund policy?',
      answer:
        'Full refunds are available for cancellations made at least 2 hours before the showtime. Cancellations made within 2 hours of the showtime are not eligible for refunds.',
    },
    {
      question: 'Can I book tickets for multiple movies at once?',
      answer:
        'Currently, you need to complete separate bookings for each movie. However, you can book multiple seats for the same showtime in a single transaction.',
    },
    {
      question: 'Are there any discounts available?',
      answer:
        'Yes, we offer various discounts including student discounts, senior citizen discounts, and special promotions during weekdays. Check our promotions page for current offers.',
    },
    {
      question: 'What if I arrive late to the cinema?',
      answer:
        'We recommend arriving at least 15 minutes before the showtime. If you arrive after the movie has started, entry may be restricted depending on the cinema\'s policy.',
    },
    {
      question: 'Can I choose my seats?',
      answer:
        'Yes, our booking system allows you to select your preferred seats from the available options. You can view the seating layout and choose seats that best suit your preferences.',
    },
    {
      question: 'How do I contact customer support?',
      answer:
        'You can reach our customer support team via email at support@absolutecinema.com or call us at 1-800-CINEMA. Our support hours are 9 AM to 9 PM, 7 days a week.',
    },
  ];

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
            <Help sx={{ fontSize: 80, color: 'secondary.main', mb: 2 }} />
            <Typography variant="h2" fontWeight={700} gutterBottom>
              Help Center
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Find answers to frequently asked questions
            </Typography>
          </Box>

          {/* FAQs */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
              Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: 'secondary.main' }} />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      my: 1.5,
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Contact Section */}
          <Box
            sx={{
              mt: 6,
              p: 3,
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Still need help?
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              Our customer support team is here to assist you
            </Typography>
            <Typography variant="body1">
              Email: <strong>support@absolutecinema.com</strong>
            </Typography>
            <Typography variant="body1">
              Phone: <strong>1-800-CINEMA</strong>
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: 'rgba(255, 255, 255, 0.6)' }}>
              Support Hours: 9 AM - 9 PM (7 days a week)
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default HelpCenter;
