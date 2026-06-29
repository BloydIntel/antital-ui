"use client"

import { ArrowRight, Wallet, HandCoins, ChartBarIncreasing, TrendingUp } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TYPOGRAPHY } from "@/constants/styles"
import type { DashboardSummary } from "@/types/dashboard-api"

const formatCurrency = (val: string | number) => {
  const numericValue = typeof val === "string"
    ? parseFloat(val.replace(/[^0-9.-]+/g, ""))
    : val;

  if (isNaN(numericValue)) return "₦0.00";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue).replace("NGN", "₦");
};

const formatFundraiserCurrency = (val: string | number, showSymbol = true) => {
  const numericValue = typeof val === "string" ? parseFloat(val.replace(/[^0-9.-]+/g, "")) : val;
  if (isNaN(numericValue)) return showSymbol ? "₦0" : "0";

  const formatted = new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue);

  return showSymbol ? `₦${formatted}` : formatted;
};

interface SummaryCardProps {
  title: string
  subtitle?: string
  value: string
  icon: React.ElementType
  footerText?: string
  isPrimary?: boolean
  isLoading?: boolean
  isFundraiserView?: boolean
}

function SummaryCard({
  title,
  subtitle,
  value,
  icon: Icon,
  footerText,
  isPrimary,
  isLoading = false,
  isFundraiserView = false
}: SummaryCardProps) {

  if (isFundraiserView) {
    return (
      <Card className={cn(
        "w-full xl:min-w-[220px] overflow-hidden border-[#EAEAEA] shadow-none rounded-md",
        isPrimary && "bg-[#052119] text-white"
      )}>
        <CardContent className="px-4 flex flex-col gap-5">
          {/* Top Row: Icon Container */}
          <div className={cn(
            "p-2 w-10 h-10 rounded-xs flex items-center justify-center",
            isPrimary ? "bg-white text-[#052119]" : "bg-[#F4F7F6] text-[#052119]"
          )}>
            <Icon className="size-6" />
          </div>

          {/* Bottom Content Area */}
          <div className="space-y-2">
            <p className={cn(
              "text-[16px] uppercase font-medium tracking-wider leading-none",
              isPrimary ? "text-[#F4F5F7]" : "text-[#555555]"
            )}
              style={TYPOGRAPHY.body}
            >
              {title}
            </p>
            <h3 className={cn(
              "text-[28px] font-bold leading-none tracking-tight",
              isPrimary ? "text-white" : "text-[#1A1C1E]",
              isLoading && "animate-pulse opacity-60"
            )}
              style={TYPOGRAPHY.heading}
            >
              {isLoading ? (title.toLowerCase().includes("number") || title.toLowerCase().includes("days") ? "0" : "₦0") : value}
            </h3>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Standard/Existing UI View with normalized padding wrappers
  return (
    <Card className="w-full xl:min-w-[300px] overflow-hidden border-[#EAEAEA] shadow-none rounded-md">
      <CardContent className={cn(
        "p-5",
        isPrimary ? "bg-[#052119] text-white" : "bg-white text-[#1A1C1E]"
      )}>
        <div className="flex items-center gap-4">
          <div className={cn(
            "p-2 rounded-md",
            isPrimary ? "bg-white" : "bg-[#E6EAE9]"
          )}>
            <Icon className="size-5 xl:size-6 text-[#1A1C1E]" />
          </div>
          <div>
            <p className={cn("text-[20px] lg:text-[16px] xl:text-[24px] leading-tight", isPrimary ? "text-white" : "text-[#1A1C1E]")} style={TYPOGRAPHY.heading}>
              {title}
            </p>
            {subtitle && (
              <p className={cn("text-[12px] xl:text-[16px] mt-0.5", isPrimary ? "text-[#F1F1F1]" : "text-[#2C2C2C]")} style={TYPOGRAPHY.body}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <h3 className={cn("text-[24px] tracking-tight", isPrimary ? "text-[#F1F1F1]" : "text-[#1B1B1B]", isLoading && "animate-pulse opacity-60")} style={TYPOGRAPHY.heading}>
            {isLoading ? "₦0.00" : value}
          </h3>
        </div>
      </CardContent>
      {footerText && (
        <CardFooter className="px-5 py-3 flex justify-between items-center cursor-pointer hover:opacity-80 transition-opacity bg-[#E6EAE9] border-t border-[#EAEAEA]">
          <span className="text-[14px] text-[#042E27]" style={TYPOGRAPHY.heading}>
            {footerText}
          </span>
          <ArrowRight className="size-4 text-[#052119]" />
        </CardFooter>
      )}
    </Card>
  )
}

interface SectionCardsProps {
  summary?: DashboardSummary
  isLoading?: boolean
  state?: boolean
  userType?: "individual" | "corporate" | "fundraiser"
}

export function SectionCards({ summary, isLoading = false, state = false, userType = "individual" }: SectionCardsProps) {
  const useMock = summary === undefined && state
  const isFundraiser = userType === "fundraiser"

  const fundraiserCardData = [
    {
      title: "Total Amount Raised",
      value: formatFundraiserCurrency(useMock ? 245000000 : (summary?.totalInvested ?? 0), false),
      icon: Wallet,
      isPrimary: true,
      isFundraiserView: true
    },
    {
      title: "Total Number of Investors",
      value: formatFundraiserCurrency(useMock ? 128 : (summary?.totalReturns ?? 0), false),
      icon: HandCoins,
      isFundraiserView: true
    },
    {
      title: "Days Remaining",
      value: String(useMock ? 18 : 0),
      icon: TrendingUp,
      isFundraiserView: true
    },
    {
      title: "Avg. Investment Size",
      value: formatFundraiserCurrency(useMock ? 196314 : (summary?.availableBalance ?? 0), true),
      icon: TrendingUp,
      isFundraiserView: true
    }
  ]

  const standardCardData = [
    {
      title: "Available balance",
      subtitle: "Overview",
      value: formatCurrency(useMock ? 5_325_400 : (summary?.availableBalance ?? 0)),
      icon: Wallet,
      footerText: "See details",
      isPrimary: true,
    },
    {
      title: "Total Invested",
      subtitle: "Total funds committed",
      value: formatCurrency(useMock ? 2_215_200 : (summary?.totalInvested ?? 0)),
      icon: HandCoins,
      footerText: "View Summary",
    },
    {
      title: "Total returns",
      subtitle: "Overview",
      value: formatCurrency(useMock ? 1_215_200 : (summary?.totalReturns ?? 0)),
      icon: ChartBarIncreasing,
      footerText: "See details",
    },
  ]

  const activeCards = isFundraiser ? fundraiserCardData : standardCardData

  return (
    <div className={cn(
      "grid gap-6",
      isFundraiser ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    )}>
      {activeCards.map((card, index) => (
        <SummaryCard key={index} {...card} isLoading={isLoading} />
      ))}
    </div>
  )
}