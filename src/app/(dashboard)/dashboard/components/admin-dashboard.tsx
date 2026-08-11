"use client"

import { useState, type ComponentType, type ReactNode } from "react"
import Link from "next/link"
import {
  BriefcaseBusiness,
  CircleDollarSign,
  ChevronDown,
  FileText,
  FileWarning,
  LifeBuoy,
  ShieldAlert,
  TrendingUp,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const periodOptions = ["Last 7 Days", "Last 30 Days", "Last 90 Days"] as const

const actionItems = [
  {
    title: "Pending KYC Reviews",
    description: "24 users awaiting verification",
    icon: ShieldAlert,
    iconClassName: "bg-[#FDE8EA] text-[#F43F5E]",
  },
  {
    title: "Pending Campaigns",
    description: "7 campaigns require approval",
    icon: FileText,
    iconClassName: "bg-[#FFF6D9] text-[#F4B400]",
  },
  {
    title: "Unresolved Tickets",
    description: "12 high-priority support tickets",
    icon: LifeBuoy,
    iconClassName: "bg-[#E7F0FF] text-[#4285F4]",
  },
  {
    title: "Payout Exceptions",
    description: "5 transfers require manual review",
    icon: CircleDollarSign,
    iconClassName: "bg-[#E8F6F1] text-[#087A67]",
  },
  {
    title: "Expiring Documents",
    description: "9 compliance documents expire soon",
    icon: FileWarning,
    iconClassName: "bg-[#FFF0E5] text-[#E56B1F]",
  },
  {
    title: "Flagged Accounts",
    description: "3 accounts require investigation",
    icon: ShieldAlert,
    iconClassName: "bg-[#FDE8EA] text-[#F43F5E]",
  },
]

const recentActivity = [
  { campaign: "AgriGrow Fund", detail: "reached 50% funding goal.", time: "2 hours ago" },
  { campaign: "GADA", detail: "reached 75% funding goal.", time: "4 hours ago" },
  { campaign: "SunWind Techno", detail: "reached 100% funding goal.", time: "6 hours ago" },
  { campaign: "Optimus Growth Fund", detail: "reached 25% funding goal.", time: "8 hours ago" },
  { campaign: "Optimus Growth Fund", detail: "reached 25% funding goal.", time: "8 hours ago" },
]

interface StatCardProps {
  title: string
  value: string
  icon: ComponentType<{ className?: string }>
  featured?: boolean
  footer: ReactNode
}

function StatCard({ title, value, icon: Icon, featured = false, footer }: StatCardProps) {
  return (
    <article
      className={cn(
        "min-h-[210px] rounded-lg border p-5 shadow-[0_1px_2px_rgba(16,24,40,0.03)] lg:p-6",
        featured
          ? "border-[#033B32] bg-[#033B32] text-white"
          : "border-[#E4E7EC] bg-white text-[#1F1F1F]"
      )}
    >
      <div className={cn("mb-7 flex size-12 items-center justify-center rounded-md", featured ? "bg-white text-[#1F1F1F]" : "bg-[#F4F7F6] text-[#073F35]")}>
        <Icon className="size-6" />
      </div>
      <p className={cn("text-base", featured ? "text-white/90" : "text-[#8A8D89]")}>{title}</p>
      <p className="mt-1 text-[32px] font-semibold leading-tight tracking-[-0.02em]">{value}</p>
      <div className={cn("mt-4 flex items-center gap-2 text-sm", featured ? "text-white" : "text-[#8A8D89]")}>{footer}</div>
    </article>
  )
}

export function AdminDashboard() {
  const [period, setPeriod] = useState<(typeof periodOptions)[number]>("Last 30 Days")
  const [showAllActions, setShowAllActions] = useState(false)
  const visibleActionItems = showAllActions ? actionItems : actionItems.slice(0, 3)

  return (
    <main className="pb-6">
      <section className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.02em] text-[#1F1F1F] md:text-[34px]">
            Command Center
          </h1>
          <p className="mt-1 text-base text-[#5F625F] md:text-lg">
            Monitor platform activity, performance, and operations in real time
          </p>
        </div>

        <div className="relative w-full sm:w-auto">
          <select
            aria-label="Dashboard reporting period"
            value={period}
            onChange={(event) => setPeriod(event.target.value as (typeof periodOptions)[number])}
            className="h-12 w-full appearance-none rounded-md border border-[#A8AAA8] bg-white px-4 pr-10 text-base font-medium text-[#292B29] outline-none focus:border-[#A8BD27] focus:ring-2 focus:ring-[#A8BD27]/20 sm:w-[170px]"
          >
            {periodOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#292B29]" />
        </div>
      </section>

      <section aria-label="Platform overview" className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <StatCard
          featured
          title="Total Investors"
          value="14,205"
          icon={Users}
          footer={<><TrendingUp className="size-5" /><span>+12.5% vs last month</span></>}
        />
        <StatCard
          title="Active Campaigns"
          value="48"
          icon={TrendingUp}
          footer={<><TrendingUp className="size-5" /><strong className="font-medium text-[#A8BD27]">2.4B Raised</strong><span>•</span><span>₦800M in Escrow</span></>}
        />
        <StatCard
          title="Total Campaigns"
          value="156"
          icon={BriefcaseBusiness}
          footer={<><TrendingUp className="size-5" /><strong className="font-medium text-[#A8BD27]">12.5 B</strong><span>Total funds raised</span></>}
        />
      </section>

      <section className="mt-7 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <article className="rounded-xl border border-[#DDE4ED] bg-white p-5 md:p-6">
          <div className="flex items-center justify-between border-b border-[#E7E9E7] pb-5">
            <h2 className="text-lg font-semibold text-[#292B29]">Action Required</h2>
            <Button
              variant="link"
              aria-controls="admin-action-items"
              aria-expanded={showAllActions}
              onClick={() => setShowAllActions((current) => !current)}
              className="h-12 rounded-none px-5 text-base font-medium text-[#A8BD27] hover:bg-[#B7CB53] hover:text-[#123A30] hover:no-underline"
            >
              View All
            </Button>
          </div>
          <div
            id="admin-action-items"
            className={cn(
              "space-y-4 pt-6",
              showAllActions && "max-h-[318px] overflow-y-auto pr-2"
            )}
          >
            {visibleActionItems.map((item) => (
              <div key={item.title} className="flex flex-col gap-4 rounded-lg border border-[#E7EBEF] bg-[#F8FAFC] p-4 sm:flex-row sm:items-center">
                <div className={cn("flex size-12 shrink-0 items-center justify-center rounded-md", item.iconClassName)}>
                  <item.icon className="size-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-[#293044]">{item.title}</h3>
                  <p className="mt-0.5 text-sm text-[#70809A]">{item.description}</p>
                </div>
                <Button variant="outline" className="h-11 rounded-md border-[#DDE1E5] bg-white px-5 text-[#292B29]">Review</Button>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            aria-controls="admin-action-items"
            aria-expanded={showAllActions}
            onClick={() => setShowAllActions((current) => !current)}
            className="mt-7 h-12 w-full rounded-md border-[#E1E3E1] text-base font-medium"
          >
            {showAllActions ? "Show less" : "Show all"}
          </Button>
        </article>

        <article className="rounded-xl border border-[#DDE4ED] bg-white p-5 md:p-6">
          <div className="flex items-center justify-between border-b border-[#E7E9E7] pb-5">
            <h2 className="text-lg font-semibold text-[#292B29]">Recent Activity</h2>
            <Button
              variant="link"
              asChild
              className="h-12 rounded-none px-5 text-base font-medium text-[#A8BD27] hover:bg-[#B7CB53] hover:text-[#123A30] hover:no-underline"
            >
              <Link href="/activity-logs">View Log</Link>
            </Button>
          </div>
          <ol className="pt-3">
            {recentActivity.map((activity, index) => (
              <li key={`${activity.campaign}-${index}`} className="relative flex gap-4 py-4">
                {index < recentActivity.length - 1 && <span className="absolute left-[5px] top-7 h-[calc(100%-12px)] w-px bg-[#EDF0ED]" />}
                <span className="relative mt-2 size-2.5 shrink-0 rounded-full bg-[#B0C63B]" />
                <div>
                  <p className="text-[15px] leading-6 text-[#343634] sm:text-base">
                    Campaign <span className="text-[#A8BD27]">{activity.campaign}</span> {activity.detail}
                  </p>
                  <p className="mt-1 text-sm text-[#8A8D89]">{activity.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </section>
    </main>
  )
}
