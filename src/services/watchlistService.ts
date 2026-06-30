import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
  AddToWatchlistRequest,
  WatchlistItem,
  WatchlistResponse,
  WatchlistStatusResponse,
} from "@/types/watchlist";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/investors/me/watchlist";

async function getWatchlist(): Promise<WatchlistResponse> {
  try {
    const res = await request.get<ApiResponse<WatchlistResponse>>(BASE);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function addToWatchlist(offeringId: number): Promise<WatchlistItem> {
  try {
    const payload: AddToWatchlistRequest = { offeringId };
    const res = await request.post<ApiResponse<WatchlistItem>>(BASE, payload);
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function removeFromWatchlist(offeringId: number): Promise<void> {
  try {
    const res = await request.delete<ApiResponse<unknown>>(`${BASE}/${offeringId}`);
    unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

async function getWatchlistStatus(offeringId: number): Promise<WatchlistStatusResponse> {
  try {
    const res = await request.get<ApiResponse<WatchlistStatusResponse>>(
      `${BASE}/status`,
      { params: { offeringId } }
    );
    return unwrap(res.data);
  } catch (error) {
    throw toApiError(error);
  }
}

const watchlistService = {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlistStatus,
};

export default watchlistService;
