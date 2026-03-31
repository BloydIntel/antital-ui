import { ArrowRight, Wallet, HandCoins, ChartBarIncreasing } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SummaryCardProps {
  title: string
  subtitle: string
  value: string
  icon: React.ElementType
  footerText: string
  isPrimary?: boolean
}

function SummaryCard({ title, subtitle, value, icon: Icon, footerText, isPrimary }: SummaryCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden border-[#EAEAEA] shadow-none rounded-md",
      isPrimary ? "bg-[#052119] text-white" : "bg-white text-[#1A1C1E]"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-2 rounded-md",
            isPrimary ? "bg-white/10" : "bg-[#F4F5F7]"
          )}>
            <Icon className={cn("size-6", isPrimary ? "text-white" : "text-[#1A1C1E]")} />
          </div>
          <div className="space-y-1">
            <p className={cn("text-lg font-medium leading-tight", isPrimary ? "text-white" : "text-[#1A1C1E]")}>
              {title}
            </p>
            <p className={cn("text-xs", isPrimary ? "text-white/60" : "text-[#6A7682]")}>
              {subtitle}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-3xl font-bold tracking-tight">
            {value}
          </h3>
        </div>
      </CardContent>
      <CardFooter className={cn(
        "px-6 py-3 flex justify-between items-center border-t cursor-pointer hover:opacity-80 transition-opacity",
        isPrimary ? "bg-white/5 border-white/10" : "bg-[#F4F5F7]/50 border-[#EAEAEA]"
      )}>
        <span className={cn("text-sm font-medium", isPrimary ? "text-white" : "text-[#052119]")}>
          {footerText}
        </span>
        <ArrowRight className={cn("size-4", isPrimary ? "text-white" : "text-[#052119]")} />
      </CardFooter>
    </Card>
  )
}

export function SectionCards() {
  const cardData = [
    {
      title: "Available balance",
      subtitle: "Overview",
      value: "₦0.00",
      icon: Wallet,
      footerText: "See details",
      isPrimary: true,
    },
    {
      title: "Total Invested",
      subtitle: "Total funds committed",
      value: "₦0.00",
      icon: HandCoins,
      footerText: "View Summary",
    },
    {
      title: "Total returns",
      subtitle: "Overview",
      value: "₦0.00",
      icon: ChartBarIncreasing,
      footerText: "See details",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cardData.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  )
}