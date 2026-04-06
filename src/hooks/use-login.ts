"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authService, { type LoginRequest, type LoginResponse } from "@/services/authService";
import { CACHE_KEY_USER } from "@/constants";
import { tokenStorage } from "@/lib/token-storage";
import { showApiErrorToast } from "@/lib/error-feedback";

export type { LoginRequest, LoginResponse };

const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: ["login"],
    mutationFn: authService.login,
    onSuccess: (data, variables) => {
      const persistent = variables.remember === true;
      tokenStorage.setAccessToken(data.token, persistent);
      if (data.refreshToken)
        tokenStorage.setRefreshToken(data.refreshToken, persistent);
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });
      // Defer redirect so the login button's loading state can paint before navigation
      requestAnimationFrame(() => {
        router.push("/dashboard");
      });
    },
    onError: (err) => {
      showApiErrorToast(err, "Unable to login.");
    },
  });
};

export default useLogin;
