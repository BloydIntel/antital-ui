"use client"

import { useState } from "react";
import { WatchlistFilter, WatchlistCategory } from "@/components/watchlist/organisms/WatchlistFilter";
import { TYPOGRAPHY } from "@/constants/styles";
import { InvestmentData, RiskLevel } from "@/types/dashboard";
import { WatchlistTable } from "@/components/watchlist/organisms/WatchlistTable";
import investmentData from "@/data/dashboardInvestmentData.json"

export function Watchlist() {

    const [activeCategory, setActiveCategory] = useState<WatchlistCategory>("all");
    const [activeRisk, setActiveRisk] = useState<RiskLevel | "all">("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const totalCount = investmentData.length;

    const endingSoonCount = investmentData.filter(
        item => item.daysLeft !== undefined && item.daysLeft < 3
    ).length;

    const nearTargetCount = investmentData.filter(
        item => item.percentage !== undefined && item.percentage > 80
    ).length;

    const filteredData = investmentData.filter(item => {

        if (activeCategory === "ending_soon" && (item.daysLeft === undefined || item.daysLeft >= 3)) {
            return false;
        }

        if (activeCategory === "near_target" && (item.percentage === undefined || item.percentage <= 80)) {
            return false;
        }

        if (activeRisk !== "all" && item.risk !== activeRisk) return false;

        if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        return true;
    });

    const watchlistCounts = {
        all: totalCount,
        endingSoon: endingSoonCount,
        nearTarget: nearTargetCount
    };

    return (
        <div className="space-y-6">

            {/* Heading Layout Section */}
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

            {/* Structured Watchlist Filter Bar */}
            <WatchlistFilter
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                activeRisk={activeRisk}
                onRiskChange={setActiveRisk}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                counts={watchlistCounts}
            />

            <WatchlistTable data={filteredData as InvestmentData[]} filterType={activeCategory} />
        </div>
    );
}