import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CACHE_KEY_FUNDRAISER_SETTINGS_NOTIFICATIONS,
  CACHE_KEY_FUNDRAISER_SETTINGS_PROFILE,
  CACHE_KEY_FUNDRAISER_SETTINGS_BANK_ACCOUNTS,
  CACHE_KEY_FUNDRAISER_SETTINGS_PAYOUT,
} from "@/constants";
import fundraiserSettingsService from "@/services/fundraiserSettingsService";
import type {
  UpdateFundraiserNotificationPreferencesRequest,
  UpdateFundraiserSettingsProfileRequest,
  AddFundraiserBankAccountRequest,
  UpdateFundraiserBankAccountRequest,
  UpdateFundraiserPayoutSettingsRequest,
} from "@/types/settings";

export function useFundraiserSettingsProfile() {
  return useQuery({
    queryKey: CACHE_KEY_FUNDRAISER_SETTINGS_PROFILE,
    queryFn: () => fundraiserSettingsService.getProfile(),
  });
}

export function useUpdateFundraiserSettingsProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateFundraiserSettingsProfileRequest) =>
      fundraiserSettingsService.updateProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_KEY_FUNDRAISER_SETTINGS_PROFILE, data);
    },
  });
}

export function useFundraiserNotificationPreferences() {
  return useQuery({
    queryKey: CACHE_KEY_FUNDRAISER_SETTINGS_NOTIFICATIONS,
    queryFn: () => fundraiserSettingsService.getNotifications(),
  });
}

export function useUpdateFundraiserNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateFundraiserNotificationPreferencesRequest) =>
      fundraiserSettingsService.updateNotifications(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(CACHE_KEY_FUNDRAISER_SETTINGS_NOTIFICATIONS, data);
    },
  });
}

export function useFundraiserBankAccounts() {
  return useQuery({
    queryKey: CACHE_KEY_FUNDRAISER_SETTINGS_BANK_ACCOUNTS,
    queryFn: () => fundraiserSettingsService.getBankAccounts(),
  });
}

function invalidateBankAccounts(queryClient: ReturnType<typeof useQueryClient>) {
  return queryClient.invalidateQueries({ queryKey: CACHE_KEY_FUNDRAISER_SETTINGS_BANK_ACCOUNTS });
}

export function useAddFundraiserBankAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddFundraiserBankAccountRequest) => fundraiserSettingsService.addBankAccount(payload),
    onSuccess: () => invalidateBankAccounts(queryClient),
  });
}

export function useUpdateFundraiserBankAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateFundraiserBankAccountRequest }) =>
      fundraiserSettingsService.updateBankAccount(id, payload),
    onSuccess: () => invalidateBankAccounts(queryClient),
  });
}

export function useVerifyFundraiserBankAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => fundraiserSettingsService.verifyBankAccount(id),
    onSuccess: () => invalidateBankAccounts(queryClient),
  });
}

export function useSetPrimaryFundraiserBankAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => fundraiserSettingsService.setPrimaryBankAccount(id),
    onSuccess: () => {
      void invalidateBankAccounts(queryClient);
      void queryClient.invalidateQueries({ queryKey: CACHE_KEY_FUNDRAISER_SETTINGS_PAYOUT });
    },
  });
}

export function useDeleteFundraiserBankAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => fundraiserSettingsService.deleteBankAccount(id),
    onSuccess: () => {
      void invalidateBankAccounts(queryClient);
      void queryClient.invalidateQueries({ queryKey: CACHE_KEY_FUNDRAISER_SETTINGS_PAYOUT });
    },
  });
}

export function useFundraiserPayoutSettings() {
  return useQuery({
    queryKey: CACHE_KEY_FUNDRAISER_SETTINGS_PAYOUT,
    queryFn: () => fundraiserSettingsService.getPayoutSettings(),
  });
}

export function useUpdateFundraiserPayoutSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateFundraiserPayoutSettingsRequest) => fundraiserSettingsService.updatePayoutSettings(payload),
    onSuccess: (data) => queryClient.setQueryData(CACHE_KEY_FUNDRAISER_SETTINGS_PAYOUT, data),
  });
}
