"use client"

import { TYPOGRAPHY } from '@/constants/styles'
import { InvestmentData, MarketType, RiskLevel, Sector } from '@/types/dashboard'
import React, { useEffect, useRef, useState } from 'react'
import investmentDataRaw from '@/data/dashboardInvestmentData.json'
import { MarketFilterBar } from '@/components/marketplace/organisms/MarketplaceFilterBar'
import { PrimaryMarketCard } from '@/components/marketplace/organisms/PrimaryMarketCard'
import { SecondaryMarketCard } from '@/components/marketplace/organisms/SecondaryMarketCard'
import { DataTable } from '../../dashboard/components/data-table'
import { useSearchParams } from 'next/navigation'

type MarketFilters = {
    sector: Sector;
    risk: RiskLevel | "all";
    tradeType?: "buy" | "sell"; // Optional because Primary doesn't use it
};

const marketTypes = [
    { id: "primary", label: "Primary Market" },
    { id: "secondary", label: "Secondary Market" }
] as const;

const INVESTMENTS = investmentDataRaw as InvestmentData[]


export function Marketplace() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');

    const [activeMarket, setActiveMarket] = useState<MarketType>(
        tabParam === "secondary" ? "secondary" : "primary"
    )

    // Independent states for Primary Market
    const [primaryFilters, setPrimaryFilters] = useState({
        sector: "All Sector" as Sector,
        risk: "all" as RiskLevel | "all",
    });

    // Independent states for Secondary Market
    const [secondaryFilters, setSecondaryFilters] = useState({
        sector: "All Sector" as Sector,
        risk: "all" as RiskLevel | "all",
        tradeType: "buy" as "buy" | "sell"
    });


    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        if (tabParam === "secondary") {
            setActiveMarket("secondary");
        } else if (tabParam === "primary") {
            setActiveMarket("primary");
        }
    }, [tabParam]);

    const currentFilters = activeMarket === "primary" ? primaryFilters : secondaryFilters;

    const updateFilter = <K extends keyof MarketFilters>(key: K, value: MarketFilters[K]) => {
        if (activeMarket === "primary") {
            setPrimaryFilters(prev => ({ ...prev, [key]: value }));
        } else {
            setSecondaryFilters(prev => ({ ...prev, [key]: value }));
        }
    };

    const filteredData = INVESTMENTS.filter((item) => {
        const marketMatch = item.market === activeMarket;

        const filters = activeMarket === "primary" ? primaryFilters : secondaryFilters;

        const sectorMatch = filters.sector === "All Sector" || item.sector === filters.sector;
        const riskMatch = filters.risk === "all" || item.risk === filters.risk;

        const tradeMatch = activeMarket === "primary" || item.tradeType === secondaryFilters.tradeType;

        return marketMatch && sectorMatch && riskMatch && tradeMatch;
    });

    const handleScrollAction = () => {
        if (scrollRef.current) {

            if (isAtBottom) {
                // Scroll back to top
                scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Scroll down
                scrollRef.current.scrollBy({ top: 150, behavior: 'smooth' });
            }
        }
    };

    const onScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            // If we are within 20px of the bottom, flip the arrow
            setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 20);
        }
    }

    return (
        <main>
            <div className="lg:pt-6">
                <h3 className="text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Marketplace (Invest & Trade)
                </h3>
                <p className="text-[16px] text-[#505050] mb-8" style={TYPOGRAPHY.body}>
                    Explore investment opportunities in both primary and secondary market
                </p>

                {/* Tab Navigation */}
                <div className="flex gap-3 mb-6">
                    {marketTypes.map((market) => (
                        <button
                            key={market.id}
                            onClick={() => setActiveMarket(market.id)}
                            className={`pb-2 text-[16px] transition-all duration-300 cursor-pointer ${activeMarket === market.id
                                ? "text-[#1F1F1F] border-b-2 border-[#858585]"
                                : "text-[#9E9E9E] border-b-2 border-[#E6EAE9]"
                                }`}
                            style={TYPOGRAPHY.heading}
                        >
                            {market.label}
                        </button>
                    ))}
                </div>

                <div>
                    <div>
                        <h3 className="text-[26px] text-[#1F1F1F] pb-2" style={TYPOGRAPHY.heading}>
                            {activeMarket === "primary" ? "Primary Market" : "Secondary Market"}
                        </h3>
                        <p className="text-[16px] text-[#505050] mb-8" style={TYPOGRAPHY.body}>
                            {activeMarket === "primary"
                                ? "Welcome to our newest opportunities invest early for maximum impact"
                                : "Buy and sell existing shares for liquidity and growth opportunities in the secondary market"}
                        </p>
                    </div>
                </div>

                <MarketFilterBar
                    marketType={activeMarket}
                    activeSector={currentFilters.sector}
                    onSectorChange={(val) => updateFilter('sector', val)}

                    activeRisk={currentFilters.risk}
                    onRiskChange={(val) => updateFilter('risk', val)}

                    tradeType={secondaryFilters.tradeType}
                    onTradeTypeChange={(val) => updateFilter('tradeType', val)}

                    onRefresh={() => console.log("Refreshing data...")}
                />

                {/* Conditional Rendering Area */}
                <div
                    ref={scrollRef}
                    onScroll={onScroll}
                    className={`relative flex flex-col ${activeMarket === "primary" ? "max-h-[710px]" : "max-h-[520px]"} overflow-y-auto px-0 pt-2 mb-12 scrollbar-hide`}
                >
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {filteredData.map((investment) => (
                            activeMarket === "primary"
                                ? <PrimaryMarketCard key={investment.id} data={investment} />
                                : <SecondaryMarketCard key={investment.id} data={investment} tradeType={secondaryFilters.tradeType} />
                        ))}
                    </div>

                    {filteredData.length === 0 && (
                        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
                            <p className="text-[#505050]" style={TYPOGRAPHY.body}>
                                No results match your selected filters. Try adjusting your criteria.
                            </p>
                        </div>
                    )}

                    {filteredData.length !== 0 && (<div className="sticky bottom-0 left-1/2 -translate-x-1/2 z-10 w-fit mx-auto">
                        <button
                            onClick={handleScrollAction}
                            className="w-10 h-10 rounded-full bg-[#344D44] flex items-center justify-center text-white shadow-lg transition-all active:scale-90 cursor-pointer"
                        >
                            <ChevronDownIcon
                                className={`transition-transform duration-300 ${isAtBottom ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </div>)}
                </div>
            </div>

            <div>
                <DataTable state={true} />
            </div>

        </main>
    )
}

function ChevronDownIcon({ className }: { className?: string }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}>
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

