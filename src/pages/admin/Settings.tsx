import { Box, Typography, Card, CardContent } from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure your cinema management system
        </Typography>
      </Box>

      <Card elevation={0} sx={{ border: 1, borderColor: 'divider', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            General Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure general application settings
          </Typography>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ border: 1, borderColor: 'divider', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Payment Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage payment gateways and pricing
          </Typography>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Notification Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure email and SMS notifications
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
