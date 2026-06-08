import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_USER } from "@/constants";
import { getUserIdFromAccessToken } from "@/lib/jwt";
import { tokenStorage } from "@/lib/token-storage";
import userService from "@/services/userService";

export function useCurrentUser() {
  const userId = getUserIdFromAccessToken(tokenStorage.getAccessToken());

  return useQuery({
    queryKey: [...CACHE_KEY_USER, userId],
    queryFn: () => userService.getById(userId!),
    enabled: userId != null,
  });
}
