import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_INVESTOR_ACCOUNT, CACHE_KEY_INVESTOR_PROFILE } from "@/constants";
import settingsService from "@/services/settingsService";
import authService from "@/services/authService";
import type { ChangePasswordRequest } from "@/types/auth";
import type { UpdateInvestorProfileRequest } from "@/types/settings";

export function useInvestorProfile() {
  return useQuery({
    queryKey: CACHE_KEY_INVESTOR_PROFILE,
    queryFn: () => settingsService.getProfile(),
  });
}

export function useInvestorAccount() {
  return useQuery({
    queryKey: CACHE_KEY_INVESTOR_ACCOUNT,
    queryFn: () => settingsService.getAccount(),
  });
}

export function useUpdateInvestorProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateInvestorProfileRequest) =>
      settingsService.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_INVESTOR_PROFILE });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordRequest) => authService.changePassword(payload),
  });
}
