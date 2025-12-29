import type { ProductCategory } from "../enum";

export interface ProductDTO {
  product_id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  created_at?: string; // timestamp
}

export interface CreateProductDTO
  extends Omit<ProductDTO, "product_id" | "created_at"> {}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
