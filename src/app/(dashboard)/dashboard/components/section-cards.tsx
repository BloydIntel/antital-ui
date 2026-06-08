import { ArrowRight, Wallet, HandCoins, ChartBarIncreasing } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TYPOGRAPHY } from "@/constants/styles"

const formatCurrency = (val: string | number) => {
  // Extract numbers if a string like "₦1000" is passed, otherwise use number
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
    <Card className="w-full xl:w-[380px] overflow-hidden border-[#EAEAEA] shadow-none rounded-md"
    >
      <CardContent className={cn(
        "-mt-6 pt-3 pb-6",
        isPrimary ? "bg-[#052119] text-white" : "bg-white text-[#1A1C1E]"
      )}>
        <div className="flex items-center gap-4">
          <div className={cn(
            "p-1 xl:p-2 rounded-md",
            isPrimary ? "bg-white" : "bg-[#E6EAE9]"
          )}>
            <Icon className={cn(" size-5 xl:size-6 text-[#1A1C1E]")} />
          </div>
          <div >
            <p className={cn("text-[20px] lg:text-[16px] xl:text-[24px] leading-tight", isPrimary ? "text-white" : "text-[#1A1C1E]")} style={TYPOGRAPHY.heading}>
              {title}
            </p>
            <p className={cn("text-[12px] xl:text-[16px]", isPrimary ? "text-[#F1F1F1]" : "text-[#2C2C2C]")} style={TYPOGRAPHY.body}>
              {subtitle}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <h3 className={cn("text-[24px] tracking-tight", isPrimary ? "text-[#F1F1F1]" : "text-[#1B1B1B]")} style={TYPOGRAPHY.heading}>
            {formatCurrency(value)}
          </h3>
        </div>
      </CardContent>
      <CardFooter className="-my-6 px-4 py-[13.5px] flex justify-between items-center cursor-pointer hover:opacity-80 transition-opacity bg-[#E6EAE9]">
        <span className="text-[16px] text-[#042E27]" style={TYPOGRAPHY.heading}>
          {footerText}
        </span>
        <ArrowRight className="size-4 text-[#052119]" />
      </CardFooter>
    </Card>
  )
}

export function SectionCards({ state = false }: { state: boolean }) {
  const cardData = [
    {
      title: "Available balance",
      subtitle: "Overview",
      value: state ? "5325400" : "0",
      icon: Wallet,
      footerText: "See details",
      isPrimary: true,
    },
    {
      title: "Total Invested",
      subtitle: "Total funds committed",
      value: state ? "2215200.00" : "0",
      icon: HandCoins,
      footerText: "View Summary",
    },
    {
      title: "Total returns",
      subtitle: "Overview",
      value: state ? "1215200.00" : "0",
      icon: ChartBarIncreasing,
      footerText: "See details",
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cardData.map((card, index) => (
        <SummaryCard key={index} {...card} />
      ))}
    </div>
  )
}