import { Box, Typography } from '@mui/material';
import type { ProductDTO as ProductType } from '../../utils/mockdata';
import TextureImg from '../../assets/images/texture.png';

interface ProductProps {
  product: ProductType;
}

const Product = ({ product }: ProductProps) => {
  const handleInfoClick = () => {
    console.log('Product clicked:', product.product_id);
    // Handle product click
  };

  return (
    <Box
      sx={{
        width: 140,
        height: 240,
        cursor: 'pointer',
      }}
      onClick={handleInfoClick}
    >
      <Box
        sx={{
          display: 'flex',
          width: 130,
          height: 150,
          border: 2,
          borderColor: '#9c27b0',
          borderRadius: 3,
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom, white, white)',
          padding: 2,
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={TextureImg}
          alt="texture"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 0,
            opacity: 0.15,
          }}
        />
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            maxHeight: 100,
            maxWidth: 100,
            zIndex: 10,
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 400,
            color: 'black',
            letterSpacing: '0.05em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 300,
            color: 'black',
            letterSpacing: '0.05em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.price.toLocaleString()} vnd
        </Typography>
      </Box>
    </Box>
  );
};

export default Product;
