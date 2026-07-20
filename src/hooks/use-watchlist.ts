import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_WATCHLIST } from "@/constants";
import { tokenStorage } from "@/lib/token-storage";
import watchlistService from "@/services/watchlistService";

export function useWatchlist() {
  return useQuery({
    queryKey: CACHE_KEY_WATCHLIST,
    queryFn: () => watchlistService.getWatchlist(),
  });
}

export function useWatchlistStatus(offeringId: number, enabled = true) {
  const isAuthenticated = Boolean(tokenStorage.getAccessToken());

  return useQuery({
    queryKey: [...CACHE_KEY_WATCHLIST, "status", offeringId],
    queryFn: () => watchlistService.getWatchlistStatus(offeringId),
    enabled: enabled && isAuthenticated && offeringId > 0,
  });
}

export function useAddToWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (offeringId: number) => watchlistService.addToWatchlist(offeringId),
    onSuccess: (_data, offeringId) => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_WATCHLIST });
      queryClient.invalidateQueries({
        queryKey: [...CACHE_KEY_WATCHLIST, "status", offeringId],
      });
    },
  });
}

export function useRemoveFromWatchlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (offeringId: number) => watchlistService.removeFromWatchlist(offeringId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CACHE_KEY_WATCHLIST });
    },
  });
}
