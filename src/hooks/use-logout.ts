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
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      tokenStorage.clear();
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });
      router.push("/sign-in");
    },
  });
};

export default useLogout;
