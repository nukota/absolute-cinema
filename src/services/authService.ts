import { api } from "../lib/apiClient";
import type { SignUpDTO, SignInDTO, AuthResponse } from "../utils/dtos/authDTO";
import { useMutation, useQuery } from "@tanstack/react-query";

const signUp = async (data: SignUpDTO): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/signup", data);
  return response.data;
};

const signIn = async (data: SignInDTO): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/signin", data);
  return response.data;
};

const signOut = async (): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>("/auth/signout");
  return response.data;
};

const getCurrentUser = async (): Promise<AuthResponse["user"]> => {
  const response = await api.get<AuthResponse["user"]>("/auth/me");
  return response.data;
};

const refreshToken = async (data: {
  refresh_token: string;
}): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/refresh", data);
  return response.data;
};

const forgotPassword = async (data: {
  email: string;
}): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>(
    "/auth/forgot-password",
    data
  );
  return response.data;
};

const resetPassword = async (data: {
  password: string;
}): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>(
    "/auth/reset-password",
    data
  );
  return response.data;
};

export const authKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authKeys.all, "current"] as const,
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export const useSignOut = () => {
  return useMutation({
    mutationFn: signOut,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUser,
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshToken,
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
