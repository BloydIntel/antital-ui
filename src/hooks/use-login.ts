"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authService, { type LoginRequest, type LoginResponse } from "@/services/authService";
import { CACHE_KEY_USER } from "@/constants";
import { tokenStorage } from "@/lib/token-storage";
import { showApiErrorToast } from "@/lib/error-feedback";
import { resolvePostLoginPath } from "@/lib/post-login-navigation";

export type { LoginRequest, LoginResponse };

export interface UseLoginOptions {
  fromTrading?: boolean;
}

const useLogin = (options?: UseLoginOptions) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: ["login"],
    mutationFn: authService.login,
    onSuccess: async (data, variables) => {
      const persistent = variables.remember === true;
      tokenStorage.setAccessToken(data.token, persistent);
      if (data.refreshToken)
        tokenStorage.setRefreshToken(data.refreshToken, persistent);
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });

      const path = await resolvePostLoginPath(data, {
        fromTrading: options?.fromTrading,
      });
      requestAnimationFrame(() => {
        router.replace(path);
      });
    },
    onError: (err) => {
      showApiErrorToast(err, "Unable to login.");
    },
  });
};

export default useLogin;
