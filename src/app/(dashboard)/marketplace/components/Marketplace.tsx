"use client"

import { TYPOGRAPHY } from '@/constants/styles'
import { InvestmentData, RISK_COLORS } from '@/types/dashboard'
import React, { useRef, useState } from 'react'
import investmentDataRaw from '@/data/dashboardInvestmentData.json'
import { ProgressBar } from '@/components/ui/progress-bar'
import Image from 'next/image'
import { Clock4 } from 'lucide-react'

const marketTypes = ["Primary Market", "Secondary Market"]

const INVESTMENTS = investmentDataRaw as InvestmentData[]

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2); // Limits to 2 characters (e.g., "GT" for GreenTech)
};

export function Marketplace() {
    const [activeMarket, setActiveMarket] = useState("Primary Market")

    const scrollRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(false);

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

            {/* Conditional Rendering Area */}
            <div
                ref={scrollRef}
                onScroll={onScroll}
                className="flex flex-col h-[774px] overflow-y-auto px-0 xl:px-6 pt-2"
            >
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {INVESTMENTS.filter(item => item.market === activeMarket).map(item => (
                        <MarketCard key={item.id} data={item} />
                    ))}
                </div>

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

// Simple Card Component to match screenshot
function MarketCard({ data }: { data: InvestmentData }) {
    const hasLogo = data.logoSrc && data.logoSrc.trim() !== "";

    const backgroundColor = RISK_COLORS[data.risk!];

    return (
        <div className="group border border-[#E0E0E0] rounded-xl p-2 lg:p-5 shadow-sm w-full">
            <div className='flex justify-between mb-4'>
                <div className='flex flex-col lg:flex-row item-start lg:items-center gap-4'>
                    <div className="w-[78px] h-[75px] bg-[#F4F7F6] rounded-lg flex items-center justify-center overflow-hidden border border-[#EAEAEA]">
                        {hasLogo ? (
                            <Image
                                src={data.logoSrc!}
                                alt={`${data.name} logo`}
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        ) : (
                            <span className="text-[#1F1F1F] font-bold text-[16px]" style={TYPOGRAPHY.heading}>
                                {getInitials(data.name)}
                            </span>
                        )}
                    </div>
                    <div>
                        <h4 className="text-[16px] mb-3 text-[#1F1F1F]" style={TYPOGRAPHY.heading}>{data.name}</h4>
                        <div className="flex gap-2 mb-4">
                            <span className="text-[#505050] text-[14px] px-2 py-1 rounded border border-[#75757566]" style={TYPOGRAPHY.body}>{data.category}</span>
                            <span className={`text-[12px] text-[#F6FBEF] px-2 py-2 rounded capitalize`} style={{ backgroundColor }}>
                                {data.risk === 'moderate' ? 'Medium' : data.risk} Risk
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-start mb-4">
                    <span className="text-[16px] text-[#858585] flex items-center gap-1">
                        <Clock4 width={24} height={24} className='pr-1' /> {data.daysLeft} days left
                    </span>
                </div>
            </div>

            <p className='text-[16px] text-[#505050] pb-4 lg:h-[42px]' style={TYPOGRAPHY.body}>
                {data.description}
            </p>

            <div className="grid grid-cols-2 lg:flex lg:gap-20 xl:gap-11 mb-4 pt-2">
                <div>
                    <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Raised</p>
                    <p className="text-[16px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>₦{data.raised?.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Target</p>
                    <p className="text-[16px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>₦{data.goal?.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Investors</p>
                    <p className="text-[16px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>{data.investors?.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Min. Investment</p>
                    <p className="text-[16px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>₦{data.minInvestment?.toLocaleString()}</p>
                </div>
            </div>

            <div>
                <div className='flex justify-between'>
                    <p>Progress</p>
                    <p className="text-right text-xs mt-1 font-bold">{data.percentage}%</p>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <ProgressBar value={data.percentage!} fillColor='#45B424' />
                </div>
            </div>

            <button className="w-full mt-4 bg-[#00332C] text-white py-3 rounded-lg font-medium 
  transition-all duration-300 ease-in-out
  /* Mobile: Always visible */
  opacity-100 translate-y-0 
  /* Desktop (Large screens): Hidden by default, shown on group hover */
  lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
                Invest Now
            </button>
        </div>
    )
}