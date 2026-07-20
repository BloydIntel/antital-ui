"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";
import { CACHE_KEY_USER } from "@/constants";
import { tokenStorage } from "@/lib/token-storage";
import { showApiErrorToast } from "@/lib/error-feedback";
import { useUserStore } from "@/store/userStore";

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: authService.logout,
    onSuccess: () => {
      tokenStorage.clear();
      useUserStore.getState().clearUser();
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });
      router.push("/sign-in");
    },
    onError: (err) => {
      showApiErrorToast(err, "Unable to logout.");
    },
  });
};

export default useLogout;
