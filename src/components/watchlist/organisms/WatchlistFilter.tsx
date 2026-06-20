"use client"

import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TYPOGRAPHY } from "@/constants/styles";
import { RiskLevel } from "@/types/dashboard";
import { SearchInputBar } from "@/components/watchlist/organisms/SearchInputBar";

// Define strict status category tab types 
export type WatchlistCategory = "all" | "ending_soon" | "near_target";

interface WatchlistFilterProps {
    activeCategory: WatchlistCategory;
    onCategoryChange: (category: WatchlistCategory) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeRisk: RiskLevel | "all";
    onRiskChange: (risk: RiskLevel | "all") => void;
    counts: {
        all: number;
        endingSoon: number;
        nearTarget: number;
    };
}

export function WatchlistFilter({
    activeCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
    activeRisk,
    onRiskChange,
    counts
}: WatchlistFilterProps) {

    const categories = [
        { id: "all" as WatchlistCategory, label: `All (${counts.all})` },
        { id: "ending_soon" as WatchlistCategory, label: `Ending Soon (${counts.endingSoon})` },
        { id: "near_target" as WatchlistCategory, label: `Near Target (${counts.nearTarget})` }
    ];

    return (
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between w-full pt-4 pb-6">

            {/* Left Side: Dynamic Status Pill Segment Tabs */}
            <div className="flex items-center bg-[#EAEAEA]/60 p-1.5 rounded-lg w-fit xl:w-auto overflow-x-auto gap-1">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        type="button"
                        onClick={() => onCategoryChange(category.id)}
                        className={cn(
                            "px-3 py-1.5 text-[16px] rounded-md cursor-pointer transition-all whitespace-nowrap font-medium",
                            activeCategory === category.id
                                ? "bg-[#042E27] text-white shadow-sm"
                                : "text-[#505050] hover:text-black hover:bg-white/40"
                        )}
                        style={TYPOGRAPHY.body}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Right Side: Filters and Text Search Box Controls */}
            <div className="flex flex-row xl:flex-row-reverse items-center gap-2.5 w-full md:w-auto">

                {/* Text Search Bar Input */}
                <SearchInputBar
                    placeholder="Search for anything..."
                    value={searchQuery}
                    onChange={onSearchChange}
                />

                {/* Risk Filter Dropdown Select */}
                <div>
                    <Select value={activeRisk} onValueChange={(value) => onRiskChange(value as RiskLevel | "all")}>
                        <SelectTrigger className="w-full px-2.5 border-[#EAEAEA] bg-white rounded-md cursor-pointer text-[#1A1C1E] focus:ring-1 focus:ring-[#042E27]">
                            <div className="flex items-center gap-2 justify-between w-full">
                                <div className="flex items-center gap-1.5 truncate">
                                    <Filter className="h-4 w-4 text-[#858585] shrink-0" />
                                    <SelectValue placeholder="All Risk" className="text-[14px]" style={TYPOGRAPHY.body} />
                                </div>
                            </div>
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-[#EAEAEA] rounded-md shadow-lg">
                            <SelectItem value="all">All Risk</SelectItem>
                            <SelectItem value="high">High Risk</SelectItem>
                            <SelectItem value="moderate">Medium Risk</SelectItem>
                            <SelectItem value="low">Low Risk</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

            </div>
        </div>
    );
}