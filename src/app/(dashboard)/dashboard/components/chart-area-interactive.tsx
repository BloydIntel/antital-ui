"use client"

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
  SelectValue
} from "@/components/ui/select"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { TYPOGRAPHY } from "@/constants/styles"
import { useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { DashboardActiveDeal, DashboardHolding, DashboardPerformancePoint } from "@/types/dashboard-api"

type DashboardChartView = "portfolio-stat" | "investment-dist"

const CHART_VIEW_LABELS: Record<DashboardChartView, string> = {
  "portfolio-stat": "Portfolio Stat",
  "investment-dist": "Investment dist",
}

const portfolioData = [
  { month: "Jan", year: "2019", value: 10 },
  { month: "Feb", year: "2020", value: 55 },
  { month: "Mar", year: "2021", value: 45 },
  { month: "Apr", year: "2022", value: 35 },
  { month: "May", year: "2023", value: 50 },
  { month: "Jun", year: "2024", value: 48 },
  { month: "Jul", year: "2025", value: 65 },
]

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount).replace("NGN", "₦")

const formatDiff = (changePercent: number) => {
  const prefix = changePercent >= 0 ? "+" : ""
  return `${prefix}${changePercent.toFixed(2)}%`
}

const activeDealTextStyle = {
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 400,
  fontSize: "14px",
  color: "#1F1F1F"
};

interface PortfolioStatChartProps {
  portfolioPerformance?: DashboardPerformancePoint[]
  activeDeals?: DashboardActiveDeal[]
  holdings?: DashboardHolding[]
  isLoading?: boolean
  state?: boolean
}

export function PortfolioStatChart({
  portfolioPerformance,
  activeDeals,
  holdings,
  isLoading = false,
  state = false,
}: PortfolioStatChartProps) {

  const pathname = usePathname();
  const isPortfolioPage = pathname === "/portfolio";
  const isDashboardPage = pathname === "/dashboard";

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [chartView, setChartView] = useState<DashboardChartView>("portfolio-stat");

  const performanceChartData = useMemo(() => {
    if ((isDashboardPage || isPortfolioPage) && portfolioPerformance && portfolioPerformance.length > 0) {
      return portfolioPerformance.map((point) => {
        const [monthLabel, yearLabel] = point.periodLabel.split(" ")
        return {
          month: monthLabel,
          year: yearLabel ?? "",
          value: point.value,
        }
      })
    }

    return portfolioData
  }, [isDashboardPage, isPortfolioPage, portfolioPerformance])

  const distributionChartData = useMemo(() => {
    if (!holdings?.length) return []

    const bySector = new Map<string, number>()
    for (const holding of holdings) {
      const sector = holding.sector?.trim() || "Other"
      bySector.set(sector, (bySector.get(sector) ?? 0) + holding.invested)
    }

    return Array.from(bySector.entries()).map(([sector, invested]) => ({
      sector,
      invested,
    }))
  }, [holdings])

  const chartData = chartView === "investment-dist" ? distributionChartData : performanceChartData

  const portfolioHasData = useMemo(() => {
    if (chartView === "investment-dist") {
      return distributionChartData.some((item) => item.invested > 0)
    }
    return performanceChartData.some((d) => d.value !== undefined && d.value > 0)
  }, [chartView, distributionChartData, performanceChartData]);

  const deals = useMemo(() => {
    if (isDashboardPage) {
      return activeDeals ?? []
    }

    return []
  }, [activeDeals, isDashboardPage])

  const hasActiveDeals = isDashboardPage
    ? !isLoading && deals.length > 0
    : state && deals.length > 0;

  const hasActivePortfolio = isDashboardPage || isPortfolioPage
    ? !isLoading && portfolioHasData
    : state && portfolioHasData;

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

  return (
    <div className="flex flex-col xl:grid lg:grid-cols-3 gap-5 mb-12">
      <Card className={cn(
        "border-[#EAEAEA] shadow-none rounded-xl bg-white h-full w-full",
        !isPortfolioPage ? "xl:col-span-2" : "xl:col-span-3"
      )}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          {isPortfolioPage ? (
            <h3 className="text-[16px] text-[#042E27]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
              Portfolio Stats
            </h3>
          ) : (
            <Select value={chartView} onValueChange={(value) => setChartView(value as DashboardChartView)}>
              <SelectTrigger
                className="h-auto py-6 px-4 border-[#A8A8A8] rounded-md bg-white cursor-pointer focus:ring-0 font-bold text-black"
                style={{
                  fontFamily: 'var(--font-clash), sans-serif',
                  fontSize: '24px',
                  fontWeight: 500
                }}
              >
                <SelectValue>{CHART_VIEW_LABELS[chartView]}</SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="portfolio-stat">Portfolio Stat</SelectItem>
                  <SelectItem value="investment-dist">Investment dist</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </CardHeader>

        <CardContent className={hasActivePortfolio ? "pt-4" : "flex flex-col items-center justify-center min-h-[350px]"}>
          <ChartContainer config={{}} className={isPortfolioPage ? "h-[350px] w-full" : "h-[300px] w-full"}>
            {chartView === "investment-dist" && isDashboardPage ? (
              <BarChart data={chartData} margin={{ left: -10, right: 10 }}>
                <CartesianGrid stroke="#F0F0F0" />
                <XAxis
                  dataKey="sector"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A2A3A1', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#A2A3A1', fontSize: 12 }}
                  tickFormatter={(value: number) => formatCurrency(value)}
                  domain={[0, 'auto']}
                />
                <ChartTooltip content={({ active, payload }) => (
                  active && payload?.length ? (
                    <div className="bg-[#55B32B] px-3 py-1 rounded text-white text-xs font-bold shadow-lg">
                      {formatCurrency(Number(payload[0].value))}
                    </div>
                  ) : null
                )} />
                {hasActivePortfolio && (
                  <Bar dataKey="invested" fill="#55B32B" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            ) : (
            <AreaChart data={chartData} margin={{ left: -20, right: 10 }}>
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
                tickFormatter={(value: number) => formatCurrency(value)}
                domain={[0, 'auto']}
              />
              <ChartTooltip content={({ active, payload }) => (
                active && payload?.length ? (
                  <div className="bg-[#55B32B] px-3 py-1 rounded text-white text-xs font-bold shadow-lg">
                    {formatCurrency(Number(payload[0].value))}
                  </div>
                ) : null
              )} />
              {hasActivePortfolio && (
                <Area
                  type="monotone" dataKey="value" stroke="#55B32B" strokeWidth={3}
                  fillOpacity={1} fill="url(#colorUnits)"
                  activeDot={{ r: 6, fill: "#fff", stroke: "#55B32B", strokeWidth: 2 }}
                />
              )}
            </AreaChart>
            )}
          </ChartContainer>
        </CardContent>
      </Card>

      {!isPortfolioPage && (
        <Card className="bg-white">
          <CardHeader className="flex justify-between items-center">
            <p className="text-[16px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>Active Deals</p>
          </CardHeader>

          <CardContent className={hasActiveDeals ? "p-0 relative overflow-hidden" : "flex flex-col items-center justify-center min-h-[350px]"}>
            {
              hasActiveDeals ? (
                <>
                  <div
                    ref={scrollRef}
                    onScroll={onScroll}
                    className="flex flex-col h-[350px] overflow-y-auto px-6 pt-2 scrollbar-hide mask-gradient"
                    style={{ isolation: 'isolate' }}
                  >
                    {deals.map((deal) => {
                      const isPos = deal.changePercent >= 0;
                      const shorthand = deal.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 3)
                        .toUpperCase();

                      return (
                        <div
                          key={deal.offeringId}
                          className="py-2 flex items-center justify-between border-b border-[#E6EDFF] last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <Image src={deal.logoUrl} alt={deal.name} width={24} height={24} />
                            <div className="flex flex-col">
                              <p style={activeDealTextStyle}>{deal.name}</p>
                              <p style={{ ...activeDealTextStyle, color: "#505050", fontSize: "12px" }}>
                                {shorthand}
                              </p>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p style={activeDealTextStyle}>{formatCurrency(deal.price)}</p>
                            <p style={{ ...activeDealTextStyle, color: isPos ? "#55B32B" : "#D11313", fontSize: "12px" }}>
                              {formatDiff(deal.changePercent)}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    <div className="h-20 shrink-0" />
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
                </>
              ) : (
                <div className="text-center px-6">
                  <Image height={144} width={144} alt="search" src="/dashboard/search-illustration.png" className="mx-auto mb-4" />
                  <p className="text-[#6A7682] text-sm leading-relaxed">You don&apos;t have any items in your watchlist yet.</p>
                </div>
              )}
          </CardContent>
        </Card>
      )}
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
