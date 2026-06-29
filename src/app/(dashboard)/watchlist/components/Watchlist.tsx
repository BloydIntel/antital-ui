"use client"

import { useEffect, useMemo, useState } from "react";
import { WatchlistFilter, WatchlistCategory } from "@/components/watchlist/organisms/WatchlistFilter";
import { TYPOGRAPHY } from "@/constants/styles";
import { RiskLevel } from "@/types/dashboard";
import { WatchlistTable } from "@/components/watchlist/organisms/WatchlistTable";
import { useWatchlist } from "@/hooks/use-watchlist";
import {
  mapWatchlistCounts,
  mapWatchlistItemToInvestmentData,
} from "@/lib/watchlist-mappers";
import { showApiErrorToast } from "@/lib/error-feedback";
import { Button } from "@/components/ui/button";

export function Watchlist() {
  const [activeCategory, setActiveCategory] = useState<WatchlistCategory>("all");
  const [activeRisk, setActiveRisk] = useState<RiskLevel | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, isError, error, refetch } = useWatchlist();

  useEffect(() => {
    if (isError) {
      showApiErrorToast(error, "Unable to load watchlist.");
    }
  }, [isError, error]);

  const items = useMemo(
    () => (data?.items ?? []).map(mapWatchlistItemToInvestmentData),
    [data?.items]
  );

  const watchlistCounts = useMemo(() => {
    if (data?.counts) {
      return mapWatchlistCounts(data.counts);
    }

    return {
      all: items.length,
      endingSoon: items.filter((item) => item.daysLeft !== undefined && item.daysLeft < 3).length,
      nearTarget: items.filter((item) => item.percentage !== undefined && item.percentage > 80).length,
    };
  }, [data?.counts, items]);

  const filteredData = items.filter((item) => {
    if (activeCategory === "ending_soon" && (item.daysLeft === undefined || item.daysLeft >= 3)) {
      return false;
    }

    if (activeCategory === "near_target" && (item.percentage === undefined || item.percentage <= 80)) {
      return false;
    }

    if (activeRisk !== "all" && item.risk !== activeRisk) {
      return false;
    }

    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 items-start">
        <h2
          className="text-[24px] lg:text-[28px] text-[#1A1C1E] font-medium"
          style={TYPOGRAPHY.heading}
        >
          Watchlist
        </h2>
        <p
          className="text-[14px] lg:text-[15px] text-[#505050]"
          style={TYPOGRAPHY.body}
        >
          Track and manage your investment interests
        </p>
      </div>

      <WatchlistFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activeRisk={activeRisk}
        onRiskChange={setActiveRisk}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={watchlistCounts}
      />

      {isLoading ? (
        <p className="text-[14px] text-[#717171]" style={TYPOGRAPHY.body}>
          Loading watchlist...
        </p>
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 py-8">
          <p className="text-[14px] text-[#717171]" style={TYPOGRAPHY.body}>
            Unable to load your watchlist.
          </p>
          <Button variant="outline" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      ) : (
        <WatchlistTable
          data={filteredData}
          filterType={activeCategory}
        />
      )}
    </div>
  );
}
