"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import authService from "@/services/authService";
import { CACHE_KEY_USER } from "@/constants";
import { tokenStorage } from "@/lib/token-storage";

const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: authService.logout,
    onSuccess: () => {
      tokenStorage.clear();
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });
      router.push("/sign-in");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};

export default useLogout;
