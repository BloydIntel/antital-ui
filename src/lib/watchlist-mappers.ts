import type { InvestmentData, RiskLevel } from "@/types/dashboard";
import type { WatchlistCounts, WatchlistItem } from "@/types/watchlist";

function parseRisk(risk: string): Exclude<RiskLevel, "All Risk"> {
  const normalized = risk.trim().toLowerCase();
  if (normalized === "low" || normalized === "moderate" || normalized === "high") {
    return normalized;
  }
  return "moderate";
}

export function formatWatchlistAddedDate(addedAt: string): string {
  const date = new Date(addedAt);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatUpdateTimeAgo(recentUpdateAt?: string | null): string | undefined {
  if (!recentUpdateAt) {
    return undefined;
  }

  const diffMs = Date.now() - new Date(recentUpdateAt).getTime();
  if (diffMs < 0) {
    return "just now";
  }

  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) {
    return "just now";
  }
  if (minutes < 60) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }

  const weeks = Math.floor(days / 7);
  return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
}

export function mapWatchlistItemToInvestmentData(item: WatchlistItem): InvestmentData {
  return {
    id: String(item.offeringId),
    slug: item.slug,
    name: item.name,
    category: item.sector,
    sector: item.sector,
    risk: parseRisk(item.risk),
    daysLeft: item.daysLeft ?? undefined,
    percentage: item.fundingProgressPercent,
    priceChange: item.changePercent,
    watchlistAddedDate: formatWatchlistAddedDate(item.addedAt),
    recentUpdate: item.recentUpdate ?? undefined,
    updateTimeAgo: formatUpdateTimeAgo(item.recentUpdateAt),
    remindersCount: item.remindersCount,
    isWatched: true,
  };
}

export function mapWatchlistCounts(counts: WatchlistCounts) {
  return {
    all: counts.all,
    endingSoon: counts.endingSoon,
    nearTarget: counts.nearTarget,
  };
}
