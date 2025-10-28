import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

const Products = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Products
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage concession stand products and inventory
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddOutlined />}>
          Add Product
        </Button>
      </Box>

      <Card elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Product inventory will appear here
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Products;
