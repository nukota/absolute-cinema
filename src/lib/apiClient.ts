import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';
import type { AuthResponse } from '../utils/dtos/authDTO';

// API base URL - adjust based on your backend
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Token refresh state management to prevent race conditions
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token, logging, etc.
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add authorization token if available
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log('API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

/**
 * Refreshes the access token using the refresh token
 * Prevents race conditions by ensuring only one refresh happens at a time
 */
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    clearAuthData();
    return null;
  }

  try {
    // Make a direct axios call (bypassing interceptors) to avoid infinite loops
    const response = await axios.post<AuthResponse>(
      `${API_BASE_URL}/auth/refresh`,
      { refresh_token: refreshToken },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const { access_token, refresh_token: newRefreshToken } = response.data;

    if (!access_token || !newRefreshToken) {
      clearAuthData();
      return null;
    }

    // Update stored tokens
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', newRefreshToken);

    return access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearAuthData();
    return null;
  }
};

/**
 * Clears authentication data and optionally redirects to signin
 */
const clearAuthData = (shouldRedirect: boolean = true): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');

  // Only redirect if requested and not already on signin page
  if (shouldRedirect && window.location.pathname !== '/signin') {
    window.location.href = '/signin';
  }
};

// Response interceptor - handle errors, logging, etc.
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      if (import.meta.env.DEV) {
        console.error('Response Error:', {
          status: error.response.status,
          data: error.response.data,
          url: error.config?.url,
        });
      }

      // Handle 401 Unauthorized - attempt token refresh
      if (
        error.response.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        // Mark this request as retried to prevent infinite loops
        originalRequest._retry = true;

        // Skip refresh for auth endpoints to avoid infinite loops
        // Don't redirect for /auth/me (current user check)
        const isAuthEndpoint = originalRequest.url?.includes('/auth/');
        const isMeEndpoint = originalRequest.url?.includes('/auth/me');
        if (isAuthEndpoint) {
          clearAuthData(!isMeEndpoint); // Don't redirect for /auth/me
          return Promise.reject(error);
        }

        try {
          // Use shared refresh promise to prevent race conditions
          if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = refreshAccessToken();
          }

          const newAccessToken = await refreshPromise;

          if (newAccessToken) {
            // Update the authorization header with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // Retry the original request
            return apiClient(originalRequest);
          } else {
            // Refresh failed, reject the request
            return Promise.reject(error);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          // Reset refresh state
          isRefreshing = false;
          refreshPromise = null;
        }
      }

      // Handle 403 Forbidden
      if (error.response.status === 403) {
        console.error('Access forbidden - insufficient permissions');
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  },
);

// Generic API methods
export const api = {
  get: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(url, config);
  },

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, data, config);
  },

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(url, data, config);
  },

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.patch<T>(url, data, config);
  },

  delete: <T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(url, config);
  },
};

export { apiClient };
