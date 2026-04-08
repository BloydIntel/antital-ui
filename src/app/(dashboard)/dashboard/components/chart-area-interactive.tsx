"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { MoreVertical, Plus } from "lucide-react"
import Image from "next/image"

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectLabel
} from "@/components/ui/select"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { TYPOGRAPHY } from "@/constants/styles"
import { useMemo, useRef, useState } from "react"

const portfolioData = [
  { month: "Jan", year: "2019", units: 10 },
  { month: "Feb", year: "2020", units: 55 },
  { month: "Mar", year: "2021", units: 45 },
  { month: "Apr", year: "2022", units: 35 },
  { month: "May", year: "2023", units: 50 },
  { month: "Jun", year: "2024", units: 48 },
  { month: "Jul", year: "2025", units: 65 },
]

const activeDeals = [
  { iconSrc: "/dashboard/starforge.png", name: "StarForge Labs Ltd.", nameShorthand: "SLL", price: "₦22,400.00", diff: "+4.22" },
  { iconSrc: "/dashboard/plantIQ.png", name: "PlantIQ Global Limited.", nameShorthand: "PGL", price: "₦22,400.00", diff: "+4.13" },
  { iconSrc: "/dashboard/cropPause.png", name: "CropPulse Analytics Ltd.", nameShorthand: "CAL", price: "₦422,400.00", diff: "+6.20" },
  { iconSrc: "/dashboard/elevate.png", name: "Elevate Solutions Inc.", nameShorthand: "ESI", price: "₦22,400.00", diff: "-3.00" },
  { iconSrc: "/dashboard/lumina.png", name: "LuminaTech Group Ltd.", nameShorthand: "LGL", price: "₦22,400.00", diff: "+0.95" },
  { iconSrc: "/dashboard/pixel.png", name: "PixelRise Limited.", nameShorthand: "SLL", price: "₦22,400.00", diff: "+7.02" },
  { iconSrc: "/dashboard/dream.png", name: "Dreamline Systems Ltd.", nameShorthand: "DSL", price: "₦22,400.00", diff: "+3.0" },
  { iconSrc: "/dashboard/starforge.png", name: "StarForge Labs Ltd", nameShorthand: "SLL", price: "₦22,400.00", diff: "+4.22" },
  { iconSrc: "/dashboard/plantIQ.png", name: "PlantIQ Global Limited", nameShorthand: "PGL", price: "₦22,400.00", diff: "+4.13" },
]

const activeDealTextStyle = {
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 400,
  fontSize: "14px",
  color: "#1F1F1F"
};

export function PortfolioStatChart() {

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const hasActiveDeals = activeDeals.length > 0;
  const hasActivePortfolio = useMemo(() => portfolioData.some(d => d.units !== undefined), []);

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
    <div className="grid grid-cols-3 gap-5 mb-12">
      {/* --- Portfolio Chart Card --- */}
      <Card className="col-span-2 border-[#EAEAEA] shadow-none rounded-xl bg-white h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Select>
            <SelectTrigger className="py-6 px-4 border-[#A8A8A8] rounded-xs bg-white cursor-pointer">
              <SelectGroup>
                <SelectLabel className="text-[24px] text-[#000000]" style={{ fontFamily: 'var(--font-clash), sans-serif', fontWeight: 500 }}>
                  Portfolio Stat
                </SelectLabel>
              </SelectGroup>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="investment-dist">Investment dist</SelectItem>
            </SelectContent>
          </Select>
          <MoreVertical className="h-5 w-5 text-[#6A7682] cursor-pointer" />
        </CardHeader>

        <CardContent className={hasActivePortfolio ? "pt-4" : "flex flex-col items-center justify-center min-h-[350px]"}>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <AreaChart data={portfolioData} margin={{ left: -20, right: 10 }}>
              <defs>
                <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7CC755" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#7CC755" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#F0F0F0" />
              <XAxis
                dataKey={hasActivePortfolio ? "month" : "year"}
                axisLine={false} tickLine={false}
                tick={{ fill: '#A2A3A1', fontSize: 12 }} dy={10}
              />
              <YAxis
                axisLine={false} tickLine={false}
                tick={{ fill: '#A2A3A1', fontSize: 12 }}
                domain={[0, 80]} ticks={[10, 20, 30, 40, 50, 60, 70, 80]}
              />
              <ChartTooltip content={({ active, payload }) => (
                active && payload?.length ? (
                  <div className="bg-[#55B32B] px-3 py-1 rounded text-white text-xs font-bold shadow-lg">
                    {payload[0].value} units
                  </div>
                ) : null
              )} />
              {hasActivePortfolio && (
                <Area
                  type="monotone" dataKey="units" stroke="#55B32B" strokeWidth={3}
                  fillOpacity={1} fill="url(#colorUnits)"
                  activeDot={{ r: 6, fill: "#fff", stroke: "#55B32B", strokeWidth: 2 }}
                />
              )}
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* --- Deals Card --- */}
      <Card className="bg-white">
        <CardHeader className="flex justify-between items-center">
          <p className="text-[16px]" style={TYPOGRAPHY.heading}>Active Deals</p>
          <button className="bg-[#042E27] p-1 rounded-sm"><Plus className="h-4 w-4 text-white" /></button>
        </CardHeader>

        <CardContent className={hasActiveDeals ? "p-0 relative overflow-hidden" : "flex flex-col items-center justify-center min-h-[350px]"}>
          {hasActiveDeals ? (
            <>
              <div ref={scrollRef} onScroll={onScroll} className="flex flex-col h-[350px] overflow-y-auto px-6 pt-2 scrollbar-hide mask-gradient">
                {activeDeals.map((deal, i) => {
                  const isPos = deal.diff.startsWith('+');
                  return (
                    <div key={i} className="py-2 flex items-center justify-between border-b border-[#E6EDFF] last:border-0">
                      <div className="flex items-center gap-2">
                        <Image src={deal.iconSrc} alt="icon" width={24} height={24} />
                        <div className="flex flex-col">
                          <p style={activeDealTextStyle}>{deal.name}</p>
                          <p style={{ ...activeDealTextStyle, color: "#505050", fontSize: "12px" }}>{deal.nameShorthand}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p style={activeDealTextStyle}>{deal.price}</p>
                        <p style={{ ...activeDealTextStyle, color: isPos ? "#55B32B" : "#D11313", fontSize: "12px" }}>{deal.diff}</p>
                      </div>
                    </div>
                  );
                })}
                <div className="h-20 shrink-0" />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <button onClick={handleScrollAction} className="w-10 h-10 rounded-full bg-[#344D44] flex items-center justify-center text-white shadow-lg transition-all active:scale-90 cursor-pointer">
                  <ChevronDownIcon className={`transition-transform duration-300 ${isAtBottom ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center px-6">
              <Image height={144} width={144} alt="search" src="/dashboard/search-illustration.png" className="mx-auto mb-4" />
              <p className="text-[#6A7682] text-sm leading-relaxed">You don&apos;t have any items in your watchlist yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}