import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

const Showtimes = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Showtimes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Schedule and manage movie showtimes
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddOutlined />}>
          Add Showtime
        </Button>
      </Box>

      <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Showtime schedule will appear here
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Showtimes;
