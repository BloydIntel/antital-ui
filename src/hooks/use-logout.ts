"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/authService";
import { CACHE_KEY_USER } from "@/constants";
import { tokenStorage } from "@/lib/token-storage";
import { showApiErrorToast } from "@/lib/error-feedback";
import { useUserStore } from "@/store/userStore";
import { useOnboardingStore } from "@/store/onboardingStore";

function clearLocalSession(queryClient: ReturnType<typeof useQueryClient>) {
  tokenStorage.clear();
  useUserStore.getState().clearUser();
  useOnboardingStore.getState().resetOnboarding();
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("onboarding_lastAllowedStep");
    sessionStorage.removeItem("onboarding_highestStepIndex");
  }
  queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER });
}

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: authService.logout,
    onSuccess: () => {
      clearLocalSession(queryClient);
      window.location.assign("/sign-in");
    },
    onError: (err) => {
      // Still end the local session if the API call fails.
      clearLocalSession(queryClient);
      showApiErrorToast(err, "Unable to logout.");
      window.location.assign("/sign-in");
    },
  });
};

export default useLogout;
