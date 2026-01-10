import { api } from "../lib/apiClient";
import type { SignUpDTO, SignInDTO, AuthResponse } from "../utils/dtos/authDTO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Helper function to store authentication data
export const storeAuthData = (authResponse: AuthResponse, queryClient?: any) => {
  if (authResponse.access_token) {
    localStorage.setItem("access_token", authResponse.access_token);
  }
  if (authResponse.refresh_token) {
    localStorage.setItem("refresh_token", authResponse.refresh_token);
  }
  localStorage.setItem("user", JSON.stringify(authResponse.user));
  if (queryClient) {
    queryClient.setQueryData(authKeys.currentUser(), authResponse.user);
  }
};

// Helper function to clear all authentication data
export const clearAuthData = (queryClient?: any) => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  if (queryClient) {
    queryClient.clear();
  }
};

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

const verifyEmail = async (data: {
  access_token: string;
  refresh_token: string;
}): Promise<{ message: string; user: AuthResponse["user"] }> => {
  const response = await api.post<{ message: string; user: AuthResponse["user"] }>(
    "/auth/verify",
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
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // Clear all authentication data on successful signout
      clearAuthData(queryClient);
    },
    onError: () => {
      // Even if server signout fails, clear local data
      clearAuthData(queryClient);
    },
  });
};

export const useCurrentUser = () => {
  // Get initial user data from localStorage if available
  const getInitialUserData = () => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : undefined;
    } catch {
      return undefined;
    }
  };

  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUser,
    initialData: getInitialUserData(),
    staleTime: 1000 * 60 * 5, // 5 minutes
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

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};
