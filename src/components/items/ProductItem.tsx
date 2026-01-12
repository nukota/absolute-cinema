import { Box, Button, Typography } from "@mui/material";
import type { ProductDTO } from "../../utils/dtos/productDTO";

interface ProductItemProps {
  product: ProductDTO;
  quantity: number;
  onQuantityChange: (productId: string, change: number) => void;
}

const ProductItem = ({
  product,
  quantity,
  onQuantityChange,
}: ProductItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        p: 2,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        gap: 2,
        height: 160,
      }}
    >
      <Box
        sx={{
          width: 92,
          height: "100%",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "none",
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          gap: 1,
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="primary.main" fontWeight={600}>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.price)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() => onQuantityChange(product.product_id, -1)}
            disabled={!quantity}
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              minWidth: "40px",
              height: "32px",
            }}
          >
            -
          </Button>
          <Typography
            sx={{ minWidth: 30, textAlign: "center", fontWeight: 600 }}
          >
            {quantity}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onQuantityChange(product.product_id, 1)}
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              minWidth: "40px",
              height: "32px",
            }}
          >
            +
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductItem;
