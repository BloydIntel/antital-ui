"use client"

import { TYPOGRAPHY } from '@/constants/styles'
import { InvestmentData, MarketType, RiskLevel, Sector } from '@/types/dashboard'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import investmentDataRaw from '@/data/dashboardInvestmentData.json'
import { MarketFilterBar } from '@/components/marketplace/organisms/MarketplaceFilterBar'
import { SecondaryMarketCard } from '@/components/marketplace/organisms/SecondaryMarketCard'
import { InvestmentCard } from '@/components/investment/organisms/investment-card'
import { DataTable } from '../../dashboard/components/data-table'
import { useSearchParams } from 'next/navigation'
import { useInvestments } from '@/hooks/use-investments'
import { toInvestmentCardData } from '@/lib/investment-mappers'
import { InvestmentCardGridSkeleton } from '@/components/skeletons/investment-skeletons'

type MarketFilters = {
    sector: Sector;
    risk: RiskLevel | "all";
    tradeType?: "buy" | "sell";
};

const marketTypes = [
    { id: "primary", label: "Primary Market" },
    { id: "secondary", label: "Secondary Market" }
] as const;

const INVESTMENTS = investmentDataRaw as InvestmentData[]

const PRIMARY_PAGE_SIZE = 24

export function Marketplace() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');

    const [activeMarket, setActiveMarket] = useState<MarketType>(
        tabParam === "secondary" ? "secondary" : "primary"
    )

    const [primaryFilters, setPrimaryFilters] = useState({
        sector: "All Sector" as Sector,
        risk: "all" as RiskLevel | "all",
    });

    const [primarySearch, setPrimarySearch] = useState("");

    const [secondaryFilters, setSecondaryFilters] = useState({
        sector: "All Sector" as Sector,
        risk: "all" as RiskLevel | "all",
        tradeType: "buy" as "buy" | "sell"
    });

    const primaryApiParams = useMemo(() => ({
        page: 1,
        pageSize: PRIMARY_PAGE_SIZE,
        category: primaryFilters.sector === "All Sector" ? undefined : primaryFilters.sector,
        risk: primaryFilters.risk === "all" ? undefined : primaryFilters.risk,
        search: primarySearch.trim() || undefined,
    }), [primaryFilters, primarySearch]);

    const {
        data: primaryData,
        isLoading: isPrimaryLoading,
        isError: isPrimaryError,
        refetch: refetchPrimary,
    } = useInvestments(primaryApiParams);

    const primaryItems = useMemo(
        () => primaryData?.items.map(toInvestmentCardData) ?? [],
        [primaryData]
    );

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

    const filteredSecondaryData = INVESTMENTS.filter((item) => {
        const marketMatch = item.market === "secondary";
        const sectorMatch = secondaryFilters.sector === "All Sector" || item.sector === secondaryFilters.sector;
        const riskMatch = secondaryFilters.risk === "all" || item.risk === secondaryFilters.risk;
        const tradeMatch = item.tradeType === secondaryFilters.tradeType;
        return marketMatch && sectorMatch && riskMatch && tradeMatch;
    });

    const handleScrollAction = () => {
        if (scrollRef.current) {
            if (isAtBottom) {
                scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ top: 150, behavior: 'smooth' });
            }
        }
    };

    const onScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 20);
        }
    }

    const showPrimaryEmpty = !isPrimaryLoading && !isPrimaryError && primaryItems.length === 0;
    const showSecondaryEmpty = filteredSecondaryData.length === 0;
    const hasResults = activeMarket === "primary"
        ? !isPrimaryLoading && !isPrimaryError && primaryItems.length > 0
        : filteredSecondaryData.length > 0;

    return (
        <main>
            <div className="lg:pt-6">
                <h3 className="text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Marketplace (Invest & Trade)
                </h3>
                <p className="text-[16px] text-[#505050] mb-8" style={TYPOGRAPHY.body}>
                    Explore investment opportunities in both primary and secondary market
                </p>

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

                    onRefresh={() => {
                        if (activeMarket === "primary") {
                            void refetchPrimary();
                        }
                    }}
                    searchValue={activeMarket === "primary" ? primarySearch : undefined}
                    onSearchChange={activeMarket === "primary" ? setPrimarySearch : undefined}
                />

                <div
                    ref={scrollRef}
                    onScroll={onScroll}
                    className={`relative flex flex-col ${activeMarket === "primary" ? "max-h-[710px]" : "max-h-[520px]"} overflow-y-auto px-0 pt-2 mb-12 scrollbar-hide`}
                >
                    {activeMarket === "primary" ? (
                        <>
                            {isPrimaryLoading && <InvestmentCardGridSkeleton count={3} />}

                            {isPrimaryError && (
                                <p className="text-destructive text-center py-12" style={TYPOGRAPHY.body}>
                                    Unable to load investment opportunities.
                                </p>
                            )}

                            {!isPrimaryLoading && !isPrimaryError && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
                                    {primaryItems.map((investment) => (
                                        <InvestmentCard
                                            key={investment.id}
                                            data={investment}
                                            showInvestAction
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {filteredSecondaryData.map((investment) => (
                                <SecondaryMarketCard
                                    key={investment.id}
                                    data={investment}
                                    tradeType={secondaryFilters.tradeType}
                                />
                            ))}
                        </div>
                    )}

                    {(activeMarket === "primary" ? showPrimaryEmpty : showSecondaryEmpty) && (
                        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
                            <p className="text-[#505050]" style={TYPOGRAPHY.body}>
                                No results match your selected filters. Try adjusting your criteria.
                            </p>
                        </div>
                    )}

                    {hasResults && (
                        <div className="sticky bottom-0 left-1/2 -translate-x-1/2 z-10 w-fit mx-auto">
                            <button
                                onClick={handleScrollAction}
                                className="w-10 h-10 rounded-full bg-[#344D44] flex items-center justify-center text-white shadow-lg transition-all active:scale-90 cursor-pointer"
                            >
                                <ChevronDownIcon
                                    className={`transition-transform duration-300 ${isAtBottom ? 'rotate-180' : ''}`}
                                />
                            </button>
                        </div>
                    )}
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
