import { api } from "../lib/apiClient";
import type { InvoiceDTO, CreateInvoiceDTO } from "../utils/dtos/invoiceDTO";
import type { BookingHistoryDTO, UserProfileDTO } from "../utils/dtos/userDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getShowtimeById } from "./showtimesSerivce";
import { seatsKeys } from "./seatsService";

const createBooking = async (data: CreateInvoiceDTO): Promise<InvoiceDTO> => {
  const response = await api.post<InvoiceDTO>("/invoices/booking", data);
  return response.data;
};

const getAllInvoices = async (): Promise<InvoiceDTO[]> => {
  const response = await api.get<InvoiceDTO[]>("/invoices");
  return response.data;
};

const getInvoiceById = async (id: string): Promise<InvoiceDTO> => {
  const response = await api.get<InvoiceDTO>(`/invoices/${id}`);
  return response.data;
};

const getUserProfile = async (customerId: string): Promise<UserProfileDTO> => {
  const response = await api.get<UserProfileDTO>(
    `/invoices/customer/${customerId}`
  );
  return response.data;
};

const getBookingHistory = async (
  customerId: string
): Promise<BookingHistoryDTO[]> => {
  const response = await api.get<BookingHistoryDTO[]>(
    `/invoices/customer/${customerId}/history`
  );
  return response.data;
};

const deleteInvoice = async (id: string): Promise<void> => {
  await api.delete(`/invoices/${id}`);
};

export const invoicesApi = {
  createBooking,
  getAllInvoices,
  getInvoiceById,
  getUserProfile,
  getBookingHistory,
  deleteInvoice,
};

export const invoicesKeys = {
  all: ["invoices"] as const,
  lists: () => [...invoicesKeys.all, "list"] as const,
  list: (filters?: string) => [...invoicesKeys.lists(), filters] as const,
  details: () => [...invoicesKeys.all, "detail"] as const,
  detail: (id: string) => [...invoicesKeys.details(), id] as const,
  userProfile: (customerId: string) =>
    [...invoicesKeys.all, "profile", customerId] as const,
  bookingHistory: (customerId: string) =>
    [...invoicesKeys.all, "history", customerId] as const,
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: async (_data, variables) => {
      // Invalidate invoices
      queryClient.invalidateQueries({ queryKey: invoicesKeys.lists() });

      // Get the showtime ID from the booking
      const showtimeId = variables.tickets.showtime_id;

      // Fetch showtime to get room ID
      const showtime = await getShowtimeById(showtimeId);
      const roomId = showtime.room.room_id;

      queryClient.invalidateQueries({ queryKey: seatsKeys.byRoom(roomId) });
    },
  });
};

export const useAllInvoices = () => {
  return useQuery({
    queryKey: invoicesKeys.lists(),
    queryFn: getAllInvoices,
  });
};

export const useInvoice = (id: string) => {
  return useQuery({
    queryKey: invoicesKeys.detail(id),
    queryFn: () => getInvoiceById(id),
    enabled: !!id,
  });
};

export const useInvoiceUserProfile = (customerId: string) => {
  return useQuery({
    queryKey: invoicesKeys.userProfile(customerId),
    queryFn: () => getUserProfile(customerId),
    enabled: !!customerId,
  });
};

export const useBookingHistory = (customerId: string) => {
  return useQuery({
    queryKey: invoicesKeys.bookingHistory(customerId),
    queryFn: () => getBookingHistory(customerId),
    enabled: !!customerId,
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invoicesKeys.lists() });
    },
  });
};
