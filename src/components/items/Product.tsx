import { Box, Typography, useTheme } from "@mui/material";
import type { ProductDTO } from "../../utils/mockdata";
import TextureImg from "../../assets/images/texture.png";

interface ProductProps {
  product: ProductDTO;
  handleInfoClick?: (product: ProductDTO) => void;
}

const Product = ({ product, handleInfoClick }: ProductProps) => {
  const theme = useTheme();
  const handleClick = () => {
    if (handleInfoClick) {
      handleInfoClick(product);
    }
  };

  return (
    <Box
      sx={{
        width: 140,
        height: 220,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Box
        sx={{
          display: "flex",
          width: 140,
          height: 150,
          border: 2,
          borderColor: "#9c27b0",
          borderRadius: 3,
          alignItems: "center",
          justifyContent: "center",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(to bottom, #1a1a1a, #2a2a2a)"
              : "linear-gradient(to bottom, white, white)",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={TextureImg}
          alt="texture"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 0,
            opacity: theme.palette.mode === "dark" ? 0.05 : 0.15,
            filter: theme.palette.mode === "dark" ? "brightness(0.5)" : "none",
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
          display: "flex",
          flexDirection: "column",
          mt: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 400,
            color: "text.primary",
            letterSpacing: "0.05em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 300,
            color: "text.secondary",
            letterSpacing: "0.05em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product.price.toLocaleString()} vnd
        </Typography>
      </Box>
    </Box>
  );
};

export default Product;
