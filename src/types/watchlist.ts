export interface WatchlistItem {
  offeringId: number;
  slug: string;
  name: string;
  sector: string;
  risk: string;
  daysLeft: number | null;
  fundingProgressPercent: number;
  changePercent: number;
  addedAt: string;
  recentUpdate: string | null;
  recentUpdateAt: string | null;
  remindersCount: number;
}

export interface WatchlistCounts {
  all: number;
  endingSoon: number;
  nearTarget: number;
}

export interface WatchlistResponse {
  items: WatchlistItem[];
  counts: WatchlistCounts;
}

export interface AddToWatchlistRequest {
  offeringId: number;
}

export interface WatchlistStatusResponse {
  isWatchlisted: boolean;
}
