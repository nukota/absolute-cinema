import { api } from "../lib/apiClient";
import type {
  CreateCustomerDTO,
  CustomerDTO,
  UpdateCustomerDTO,
} from "../utils/dtos/customerDTO";
import type { UserProfileDTO } from "../utils/dtos/userDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const createCustomer = async (
  data: CreateCustomerDTO
): Promise<CustomerDTO> => {
  const response = await api.post<CustomerDTO>("/customers", data);
  return response.data;
};

const getAllCustomers = async (): Promise<CustomerDTO[]> => {
  const response = await api.get<CustomerDTO[]>("/customers");
  return response.data;
};

const getCustomerById = async (id: string): Promise<CustomerDTO> => {
  const response = await api.get<CustomerDTO>(`/customers/${id}`);
  return response.data;
};

const updateCustomer = async (
  id: string,
  data: UpdateCustomerDTO
): Promise<CustomerDTO> => {
  const response = await api.patch<CustomerDTO>(`/customers/${id}`, data);
  return response.data;
};

const deleteCustomer = async (id: string): Promise<void> => {
  await api.delete(`/customers/${id}`);
};

const getUserProfile = async (customerId: string): Promise<UserProfileDTO> => {
  const response = await api.get<UserProfileDTO>(
    `/invoices/customer/${customerId}`
  );
  return response.data;
};

// Query Keys
export const customersKeys = {
  all: ["customers"] as const,
  lists: () => [...customersKeys.all, "list"] as const,
  list: (filters?: string) => [...customersKeys.lists(), filters] as const,
  details: () => [...customersKeys.all, "detail"] as const,
  detail: (id: string) => [...customersKeys.details(), id] as const,
  profile: (customerId: string) =>
    [...customersKeys.all, "profile", customerId] as const,
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customersKeys.lists() });
    },
  });
};

export const useAllCustomers = () => {
  return useQuery({
    queryKey: customersKeys.lists(),
    queryFn: getAllCustomers,
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: customersKeys.detail(id),
    queryFn: () => getCustomerById(id),
    enabled: !!id,
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCustomerDTO }) =>
      updateCustomer(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: customersKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: customersKeys.detail(id),
      });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customersKeys.lists() });
    },
  });
};

export const useUserProfile = (customerId: string) => {
  return useQuery({
    queryKey: customersKeys.profile(customerId),
    queryFn: () => getUserProfile(customerId),
    enabled: !!customerId,
  });
};
