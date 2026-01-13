import { api } from "../lib/apiClient";
import { useMutation } from "@tanstack/react-query";

export interface CreatePaymentDTO {
  amount: number;
  orderId: string;
  orderInfo: string;
}

export interface CreatePaymentResponse {
  paymentUrl: string;
}

const createPayment = async (
  data: CreatePaymentDTO
): Promise<CreatePaymentResponse> => {
  const response = await api.post<CreatePaymentResponse>(
    "/vnpay/create-payment",
    data
  );
  return response.data;
};

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: createPayment,
  });
};
