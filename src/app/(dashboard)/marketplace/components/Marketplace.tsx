"use client"

import { TYPOGRAPHY } from '@/constants/styles'
import { InvestmentData } from '@/types/dashboard'
import React, { useRef, useState } from 'react'
import investmentDataRaw from '@/data/dashboardInvestmentData.json'
import { MarketFilterBar } from '@/components/marketplace/organisms/MarketplaceFilterBar'
import { PrimaryMarketCard } from '@/components/marketplace/organisms/PrimaryMarketCard'
import { SecondaryMarketCard } from '@/components/marketplace/organisms/SecondaryMarketCard'

const marketTypes = ["Primary Market", "Secondary Market"]

const INVESTMENTS = investmentDataRaw as InvestmentData[]


export function Marketplace() {
    const [activeMarket, setActiveMarket] = useState("Primary Market")
    const [activeSector, setActiveSector] = useState("All Sector")
    const [activeRisk, setActiveRisk] = useState("all")
    const [tradeType, setTradeType] = useState<"buy" | "sell">("buy")

    const marketType = activeMarket === "Primary Market" ? "primary" : "secondary";

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(false);

    const filteredData = INVESTMENTS.filter((item) => {
        const sectorMatch = activeSector === "All Sector" || item.category === activeSector;
        const riskMatch = activeRisk === "all" || item.risk === activeRisk;

        const tradeMatch = marketType === "primary" || item.tradeType === tradeType;

        return sectorMatch && riskMatch && tradeMatch;
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
        <main className="px-8 py-6">
            <h3 className="text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                Marketplace (Invest & Trade)
            </h3>
            <p className="text-[16px] text-[#505050] mb-8" style={TYPOGRAPHY.body}>
                Explore investment opportunities in both primary and secondary market
            </p>

            {/* Tab Navigation */}
            <div className="flex gap-3 mb-6">
                {marketTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => setActiveMarket(type)}
                        className={`pb-2 text-[16px] transition-all duration-300 cursor-pointer ${activeMarket === type
                            ? "text-[#1F1F1F] border-b-2 border-[#858585]"
                            : "text-[#9E9E9E] border-b-2 border-[#E6EAE9]"
                            }`}
                        style={TYPOGRAPHY.heading}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div>
                <div>
                    <h3 className="text-[26px] text-[#1F1F1F] pb-2" style={TYPOGRAPHY.heading}>
                        {activeMarket}
                    </h3>
                    <p className="text-[16px] text-[#505050] mb-8" style={TYPOGRAPHY.body}>
                        {activeMarket === "Primary Market"
                            ? "Welcome to our newest opportunities invest early for maximum impact"
                            : "Buy and sell existing shares for liquidity and growth opportunities in the secondary market"}
                    </p>
                </div>
            </div>

            <MarketFilterBar
                marketType={marketType}
                activeSector={activeSector}
                onSectorChange={setActiveSector}
                activeRisk={activeRisk}
                onRiskChange={setActiveRisk}
                tradeType={tradeType}
                onTradeTypeChange={setTradeType}
                onRefresh={() => console.log("Refreshing data...")}
            />

            {/* Conditional Rendering Area */}
            <div
                ref={scrollRef}
                onScroll={onScroll}
                className="flex flex-col h-[774px] overflow-y-auto px-0 pt-2"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredData.map((investment) => (
                        activeMarket === "Primary Market"
                            ? <PrimaryMarketCard key={investment.id} data={investment} />
                            : <SecondaryMarketCard key={investment.id} data={investment} tradeType={tradeType} />
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
                        <p className="text-[#505050]" style={TYPOGRAPHY.body}>
                            No results match your selected filters. Try adjusting your criteria.
                        </p>
                    </div>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <button
                        onClick={handleScrollAction}
                        className="w-10 h-10 rounded-full bg-[#344D44] flex items-center justify-center text-white shadow-lg transition-all active:scale-90 cursor-pointer"
                    >
                        <ChevronDownIcon
                            className={`transition-transform duration-300 ${isAtBottom ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>
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

