import { Box, Typography, Card, CardContent } from '@mui/material';

const Customers = () => {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Customers
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View and manage customer information
        </Typography>
      </Box>

      <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Customer list will appear here
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Customers;
