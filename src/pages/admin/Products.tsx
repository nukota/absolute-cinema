import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material';
import CustomTabs from '../../components/layouts/Tabs';
import { mockProducts } from '../../utils/mockdata';

const Products = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading] = useState(false);

  const tabs = [
    { label: 'All', value: 'All' },
    { label: 'Food & Drinks', value: 'Food and Drinks' },
    { label: 'Souvenirs', value: 'Souvenirs' },
    { label: 'Others', value: 'Others' },
  ];

  const handleAddNew = () => {
    console.log('Add new product');
  };

  return (
    <CustomTabs
      title="Products"
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={tabs}
      data={mockProducts}
      loading={loading}
      onAddNew={handleAddNew}
      addButtonText="Add Product"
      searchColumns={['name', 'category']}
      gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      gap="gap-6"
    >
      {(filteredData) =>
        filteredData.map((product) => (
          <Card
            key={product._id}
            sx={{
              maxWidth: 220,
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3,
              },
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
                {product.name}
              </Typography>
              <Chip
                label={product.category}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mb: 1 }}
              />
              <Typography variant="h6" color="primary" fontWeight={600}>
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.price)}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Stock:
                </Typography>
                <Typography
                  variant="caption"
                  color={product.stock > 50 ? 'success.main' : 'warning.main'}
                  fontWeight={600}
                >
                  {product.stock} units
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))
      }
    </CustomTabs>
  );
};

export default Products;
