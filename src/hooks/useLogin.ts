import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";
import type { LoginRequest } from "@/types/auth";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data) => {
      if (data.success && data.data) {
        authService.setToken(data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/");
      }
    },
  });
};
