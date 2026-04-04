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
  SelectValue,
} from "@/components/ui/select"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { SelectLabel } from "@radix-ui/react-select"
import { TYPOGRAPHY } from "@/constants/styles"
import { useRef, useState } from "react"

// Sample Data for "Active" state
const activePortfolioData = [
  { month: "Jan", units: 10 },
  { month: "Feb", units: 55 },
  { month: "Mar", units: 45 },
  { month: "Apr", units: 35 },
  { month: "May", units: 50 },
  { month: "Jun", units: 48 },
  { month: "Jul", units: 65 },
]

const inactivePortfolioData = [
  { year: "2019", },
  { year: "2020", },
  { year: "2021", },
  { year: "2022", },
  { year: "2023", },
  { year: "2024", },
  { year: "2025", },
]

const activeDeal = [
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

export function PortfolioStatChart({ isActive = false }: { isActive?: boolean }) {

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

  // 1. Empty State UI (Inactive)
  if (isActive) {
    return (
      <div className="grid grid-cols-3 gap-5 mb-12">

        <Card className="col-span-2 border-[#EAEAEA] shadow-none rounded-xl bg-white h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Select defaultValue="portfolio">
              <SelectTrigger
                className="text-[24px] py-6 px-4 border-[#A8A8A8] bg-white cursor-pointer"
                style={{
                  fontFamily: 'var(--font-clash), Clash Display, sans-serif',
                  fontWeight: 500,
                }}
              >
                <SelectGroup>
                  <SelectLabel>Portolio Stat</SelectLabel>
                </SelectGroup>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="investment-dist">Investment dist</SelectItem>
              </SelectContent>
            </Select>
            <MoreVertical className="h-5 w-5 text-[#6A7682] cursor-pointer" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[350px]">
            <ChartContainer config={{}} className="h-[300px] w-full">
              <AreaChart data={inactivePortfolioData} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7CC755" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#7CC755" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={true} horizontal={true} stroke="#F0F0F0" />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A2A3A1', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A2A3A1', fontSize: 12 }}
                  domain={[0, 80]}
                  ticks={[10, 20, 30, 40, 50, 60, 70, 80]}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#55B32B] px-3 py-1 rounded text-white text-xs font-bold shadow-lg">
                          {payload[0].value} units
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Active deal collection */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <p className="text-[16px]" style={TYPOGRAPHY.heading}>Active Deals</p>
            <button className="bg-[#042E27] p-1 rounded-sm">
              <Plus className="h-4 w-4 text-white" />
            </button>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[350px]">
            {/* Replace with your actual magnifying glass asset */}
            <div className="relative mb-6">
              <Image height={144} width={144} alt="search" src="/dashboard/search-illustration.png" />
            </div>
            <p className="text-[#6A7682] text-center max-w-[280px] leading-relaxed">
              You don&apos;t have any items in your watchlist yet. You don&apos;t have any items in your watchlist yet.
            </p>
          </CardContent>
        </Card>

      </div>
    )
  }

  // 2. Active Chart UI
  return (
    <div className=" grid grid-cols-3 gap-5 mb-12">
      <Card className="col-span-2 border-[#EAEAEA] shadow-none rounded-xl bg-white h-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <Select defaultValue="portfolio">
            <SelectTrigger className="w-[160px] h-11 border-[#EAEAEA] font-semibold text-lg">
              <SelectValue placeholder="Portfolio Stat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portfolio">Portfolio Stat</SelectItem>
            </SelectContent>
          </Select>
          <MoreVertical className="h-5 w-5 text-[#6A7682] cursor-pointer" />
        </CardHeader>
        <CardContent className="pt-4">
          <ChartContainer config={{}} className="h-[300px] w-full">
            <AreaChart data={activePortfolioData} margin={{ left: -20, right: 10 }}>
              <defs>
                <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7CC755" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#7CC755" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={true} horizontal={true} stroke="#F0F0F0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#A2A3A1', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#A2A3A1', fontSize: 12 }}
                domain={[0, 80]}
                ticks={[10, 20, 30, 40, 50, 60, 70, 80]}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#55B32B] px-3 py-1 rounded text-white text-xs font-bold shadow-lg">
                        {payload[0].value} units
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="units"
                stroke="#55B32B"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorUnits)"
                activeDot={{
                  r: 6,
                  fill: "#fff",
                  stroke: "#55B32B",
                  strokeWidth: 2
                }}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Active deal collection */}
      <Card className="h-9/10">
        <CardHeader className="flex justify-between items-center">
          <p className="text-[16px]" style={TYPOGRAPHY.heading}>Active Deals</p>
          <button className="bg-[#042E27] p-1 rounded-sm">
            <Plus className="h-4 w-4 text-white" />
          </button>
        </CardHeader>
        <CardContent className="p-0 relative overflow-hidden">
          {/* 1. Scrollable Container with restricted height */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex flex-col h-[350px] overflow-y-auto px-6 pt-2 scrollbar-hide mask-gradient"
          >
            {activeDeal.map((deal) => {
              const isPositive = deal.diff.startsWith('+');
              const diffColor = isPositive ? "#55B32B" : "#D11313";

              return (
                <div key={deal.name} className="py-1 flex flex-row items-center justify-between border-b border-[#E6EDFF] last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="rounded-sm ">
                      <Image src={deal.iconSrc} alt={deal.nameShorthand} width={24} height={24} />
                    </div>
                    <div className="flex flex-col">
                      <p style={{ ...activeDealTextStyle }}>{deal.name}</p>
                      <p style={{ ...activeDealTextStyle, color: "#505050" }}>{deal.nameShorthand}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p style={{ ...activeDealTextStyle }}>{deal.price}</p>
                    <p style={{ ...activeDealTextStyle, color: diffColor, fontSize: "12px" }}>{deal.diff}</p>
                  </div>
                </div>
              );
            })}

            {/* Spacer to allow scrolling past the last item for the fade effect */}
            <div className="h-20 shrink-0" />
          </div>

          {/* 2. The Floating Scroll Button seen in the image */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <button
              onClick={handleScrollAction}
              className="w-10 h-10 rounded-full bg-[#344D44] flex items-center justify-center text-white shadow-lg transition-all active:scale-90"
            >
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                className={`transition-transform duration-300 ${isAtBottom ? 'rotate-180' : 'rotate-0'}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}