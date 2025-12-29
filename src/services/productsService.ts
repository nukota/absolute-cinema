import { api } from "../lib/apiClient";
import type {
  ProductDTO,
  CreateProductDTO,
  UpdateProductDTO,
} from "../utils/dtos/productDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createProduct = async (data: CreateProductDTO): Promise<ProductDTO> => {
  const response = await api.post<ProductDTO>("/products", data);
  return response.data;
};

const getAllProducts = async (): Promise<ProductDTO[]> => {
  const response = await api.get<ProductDTO[]>("/products");
  return response.data;
};

const getProductById = async (id: string): Promise<ProductDTO> => {
  const response = await api.get<ProductDTO>(`/products/${id}`);
  return response.data;
};

const updateProduct = async (
  id: string,
  data: UpdateProductDTO
): Promise<ProductDTO> => {
  const response = await api.patch<ProductDTO>(`/products/${id}`, data);
  return response.data;
};

const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};

export const productsKeys = {
  all: ["products"] as const,
  lists: () => [...productsKeys.all, "list"] as const,
  list: (filters?: string) => [...productsKeys.lists(), filters] as const,
  details: () => [...productsKeys.all, "detail"] as const,
  detail: (id: string) => [...productsKeys.details(), id] as const,
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
    },
  });
};

export const useAllProducts = () => {
  return useQuery({
    queryKey: productsKeys.lists(),
    queryFn: getAllProducts,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductDTO }) =>
      updateProduct(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productsKeys.detail(id) });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
    },
  });
};
