import { api } from "@/lib/axios";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
      "/auth/login",
      credentials
    );
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  setToken: (token: string) => {
    localStorage.setItem("token", token);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },
};
