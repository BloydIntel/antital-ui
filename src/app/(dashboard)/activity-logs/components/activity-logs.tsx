"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CircleCheck, Download, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useAdminActivityLogs } from "@/hooks/use-admin-activity-logs"
import type { AdminActivityLogItem } from "@/types/admin-activity-log-api"

type Priority = "Low" | "Medium" | "High" | "Critical"
type LogStatus = "Completed" | "Pending Review" | "Success" | "Complete" | "Submitted" | "Failed"

interface ActivityLog extends Omit<AdminActivityLogItem, "occurredAtUtc" | "priority" | "status" | "detail"> {
  date: string
  time: string
  priority: Priority
  status: LogStatus
  occurredAtUtc: string
  detail?: string | null
}

const tabs = ["All", "Financial", "Compliance", "Fundraising", "Investment", "Support", "System", "Security", "Critical"] as const

const priorityStyles: Record<Priority, string> = {
  Low: "border-[#DDEED8] bg-[#F8FCF7] text-[#52A83C]",
  Medium: "border-[#FCE8BE] bg-[#FFFCF5] text-[#E9A11B]",
  High: "border-[#FFD7D7] bg-[#FFF8F8] text-[#EF4444]",
  Critical: "border-[#F5BBC3] bg-[#FFF5F6] text-[#D60025]",
}

const statusStyles: Record<LogStatus, string> = {
  Completed: "border-[#DDEED8] bg-[#F8FCF7] text-[#35A722]",
  "Pending Review": "border-[#FCE8BE] bg-[#FFFCF5] text-[#E9A11B]",
  Success: "border-[#DDEED8] bg-[#F8FCF7] text-[#35A722]",
  Complete: "border-[#DDEED8] bg-[#F8FCF7] text-[#35A722]",
  Submitted: "border-[#DDEED8] bg-[#F8FCF7] text-[#35A722]",
  Failed: "border-[#FFD7D7] bg-[#FFF8F8] text-[#EF4444]",
}

const timelineEvents = [
  "Investment initiated",
  "Payment Verified",
  "Escrow Updated",
  "Investment recorded in ledger",
  "Activity completed successfully",
] as const

function displayTime(time: string) {
  return `${time.slice(0, 5)} PM`
}

function DetailField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[13px] text-[#858885]">{label}</p>
      <div className="mt-2 text-[15px] text-[#292B29]">{children}</div>
    </div>
  )
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={label}
        className="min-w-[112px] border-[#E1E5E2] bg-white text-sm font-normal text-[#60766F] focus:border-[#A8BD27] focus:ring-[#A8BD27]/20 data-[size=default]:h-10"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="text-sm">
        <SelectItem value="All" className="text-sm">{label}: All</SelectItem>
        {options.map((option) => <SelectItem key={option} value={option} className="text-sm">{option}</SelectItem>)}
      </SelectContent>
    </Select>
  )
}

export function ActivityLogs() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("All")
  const [search, setSearch] = useState("")
  const [eventType, setEventType] = useState("All")
  const [module, setModule] = useState("All")
  const [priority, setPriority] = useState("All")
  const [status, setStatus] = useState("All")
  const [page, setPage] = useState(1)
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null)
  const pageSize = 7

  const apiParams = {
    page,
    pageSize,
    search: search.trim() || undefined,
    eventType: activeTab !== "All" && activeTab !== "Critical" ? activeTab : eventType !== "All" ? eventType : undefined,
    module: module !== "All" ? module : undefined,
    priority: activeTab === "Critical" ? "Critical" : priority !== "All" ? priority : undefined,
    status: status !== "All" ? status : undefined,
  }
  const { data, isLoading, isError } = useAdminActivityLogs(apiParams)
  const visibleLogs = (data?.items ?? []).map((log) => {
    const date = new Date(log.occurredAtUtc)
    return { ...log, date: date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }), time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) } as ActivityLog
  })
  const pageCount = Math.max(1, data?.totalPages ?? 1)
  const safePage = Math.min(page, pageCount)
  const displayedRecordCount = data?.totalCount ?? 0

  const updateFilter = (setter: (value: string) => void) => (value: string) => {
    setter(value)
    setPage(1)
  }

  const resetFilters = () => {
    setSearch("")
    setEventType("All")
    setModule("All")
    setPriority("All")
    setStatus("All")
    setActiveTab("All")
    setPage(1)
  }

  const exportLogs = () => {
    const headings = ["Date", "Time", "Event", "Module", "Entity", "Performed by", "Priority", "Status"]
    const rows = visibleLogs.map((log) => [log.date, log.time, log.event, log.module, log.entity, log.performedBy, log.priority, log.status])
    const csv = [headings, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n")
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "activity-logs.csv"
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="pb-6">
      <Link href="/dashboard" className="mb-7 inline-flex items-center gap-3 text-[#858885] transition-colors hover:text-[#233E36]">
        <ArrowLeft className="size-5 text-[#1F1F1F]" />
        <span>Back to Dashboard</span>
      </Link>

      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.02em] text-[#1F1F1F]">Activity Logs</h1>
          <p className="mt-1 text-base text-[#5F625F]">View operational events, user activities, financial updates, compliance alerts and system logs.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Select value={priority} onValueChange={updateFilter(setPriority)}>
            <SelectTrigger
              aria-label="Filter by priority"
              className="w-full border-[#A8AAA8] bg-white px-4 text-sm font-medium text-[#292B29] focus:border-[#A8BD27] focus:ring-[#A8BD27]/20 data-[size=default]:h-12 sm:w-[176px]"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="text-sm">
              <SelectItem value="All" className="text-sm">Filter by Priority</SelectItem>
              {Object.keys(priorityStyles).map((option) => <SelectItem key={option} value={option} className="text-sm">{option}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={exportLogs} className="h-12 gap-3 rounded-md bg-[#033B32] px-6 text-white hover:bg-[#075348]">
            <Download className="size-5" /> Export
          </Button>
        </div>
      </section>

      <section aria-label="Activity summary" className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {[
          { label: "Total Activities", value: data?.summary.totalActivities ?? 0, valueClassName: "text-[#292B29]" },
          { label: "Critical Alerts", value: data?.summary.criticalAlerts ?? 0, valueClassName: "text-[#E4002B]" },
          { label: "Financial Events", value: data?.summary.financialEvents ?? 0, valueClassName: "text-[#292B29]" },
          { label: "Compliance Events", value: data?.summary.complianceEvents ?? 0, valueClassName: "text-[#292B29]" },
          { label: "Support Activities", value: data?.summary.supportActivities ?? 0, valueClassName: "text-[#F2A900]" },
          { label: "System Events", value: data?.summary.systemEvents ?? 0, valueClassName: "text-[#292B29]" },
        ].map((card) => (
          <article key={card.label} className="min-h-[110px] rounded-lg border border-[#E0E4E1] bg-white p-4">
            <p className="text-sm text-[#858885]">{card.label}</p>
            <p className={cn("mt-2 text-[28px] leading-none", card.valueClassName)}>{card.value}</p>
          </article>
        ))}
      </section>

      <section className="mt-7 overflow-hidden rounded-xl border border-[#DDE4ED] bg-white">
        <div className="overflow-x-auto border-b border-[#E5E8E6] px-4">
          <div className="flex min-w-max gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => { setActiveTab(tab); setPage(1) }}
                className={cn("border-b-2 px-3 py-4 text-sm transition-colors", activeTab === tab ? "border-[#A8BD27] text-[#183D34]" : "border-transparent text-[#858885] hover:text-[#183D34]")}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b border-[#E5E8E6] p-4 xl:flex-row xl:items-center xl:justify-between">
          <label className="relative block w-full xl:max-w-[320px]">
            <span className="sr-only">Search activity logs</span>
            <input
              type="search"
              value={search}
              onChange={(event) => { setSearch(event.target.value); setPage(1) }}
              placeholder="Search for anything..."
              className="h-10 w-full rounded-md border border-[#E1E5E2] px-4 pr-10 text-sm outline-none focus:border-[#A8BD27]"
            />
            <Search className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#9A9D9A]" />
          </label>
          <div className="flex flex-wrap gap-3">
            <FilterSelect label="Event Type" value={eventType} options={["Investment", "Compliance", "Support", "Security", "System", "Fundraising", "Financial"]} onChange={updateFilter(setEventType)} />
            <FilterSelect label="Module" value={module} options={["Investor Management", "Compliance", "Fundraiser Management", "Financial Operations"]} onChange={updateFilter(setModule)} />
            <FilterSelect label="Priority" value={priority} options={Object.keys(priorityStyles)} onChange={updateFilter(setPriority)} />
            <FilterSelect label="Status" value={status} options={Object.keys(statusStyles)} onChange={updateFilter(setStatus)} />
            <Button variant="outline" onClick={resetFilters} className="h-10 gap-2 border-[#E1E5E2] text-[#38534B]">
              <Filter className="size-4" /> Filters
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1040px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5E8E6] text-[#737773]">
                {['Date & Time', 'Event', 'Module', 'Entity', 'Performed by', 'Priority', 'Status', 'Action'].map((heading, index) => (
                  <th key={heading} className={cn("px-4 py-4 font-normal", index >= 5 && "text-center")}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={8} className="px-4 py-16 text-center text-[#858885]">Loading activity logs…</td></tr>}
              {isError && <tr><td colSpan={8} className="px-4 py-16 text-center text-[#D60025]">Unable to load activity logs.</td></tr>}
              {!isLoading && !isError && visibleLogs.map((log) => (
                <tr key={log.id} className="border-b border-[#E8EBE9] text-[#292B29] hover:bg-[#FBFCFB]">
                  <td className="px-4 py-5"><span className="block">{log.date}</span><span className="mt-1 block text-[#939693]">{log.time}</span></td>
                  <td className="max-w-[150px] px-4 py-5">{log.event}</td>
                  <td className="px-4 py-5">{log.module}</td>
                  <td className="px-4 py-5">{log.entity}</td>
                  <td className="px-4 py-5">{log.performedBy}</td>
                  <td className="px-4 py-5 text-center"><span className={cn("inline-flex items-center justify-center rounded border px-2 py-1 text-xs", priorityStyles[log.priority])}>{log.priority}</span></td>
                  <td className="px-4 py-5 text-center"><span className={cn("inline-flex items-center justify-center whitespace-nowrap rounded border px-2 py-1 text-xs", statusStyles[log.status])}>{log.status}</span></td>
                  <td className="px-4 py-5 text-center"><Button variant="outline" onClick={() => setSelectedLog(log)} className="h-11 min-w-[92px] border-[#E1E5E2] bg-white">View</Button></td>
                </tr>
              ))}
              {!isLoading && !isError && visibleLogs.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-16 text-center text-[#858885]">No activity logs match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-col gap-4 px-4 py-4 text-xs text-[#858885] sm:flex-row sm:items-center sm:justify-between">
          <p>Showing {visibleLogs.length === 0 ? 0 : (safePage - 1) * pageSize + 1}-{Math.min((safePage - 1) * pageSize + visibleLogs.length, displayedRecordCount)} of {displayedRecordCount.toLocaleString()} records</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</Button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <Button key={pageNumber} variant={safePage === pageNumber ? "default" : "outline"} size="sm" onClick={() => setPage(pageNumber)} className={safePage === pageNumber ? "bg-[#033B32] text-white hover:bg-[#033B32]" : ""}>{pageNumber}</Button>
            ))}
            <Button variant="outline" size="sm" disabled={safePage === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>Next</Button>
          </div>
        </footer>
      </section>

      <Dialog open={selectedLog !== null} onOpenChange={(open) => { if (!open) setSelectedLog(null) }}>
        <DialogContent
          className="max-h-[92vh] gap-0 overflow-y-auto border-0 p-0 sm:max-w-[748px]"
          overlayClassName="bg-black/40 backdrop-blur-[1px]"
        >
          <header className="border-b border-[#E5E8E6] px-6 py-5 pr-14">
            <DialogTitle className="text-base font-medium text-[#202220]">Activity Details</DialogTitle>
            <DialogDescription className="sr-only">Full details for the selected activity log.</DialogDescription>
          </header>

          {selectedLog && (
            <div className="px-6 pb-6">
              <section className="flex flex-col gap-4 border-b border-[#E5E8E6] py-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#292B29]">{selectedLog.event}</h2>
                    <span className={cn("inline-flex rounded border px-2 py-1 text-xs", priorityStyles[selectedLog.priority])}>{selectedLog.priority}</span>
                  </div>
            <p className="mt-2 text-sm text-[#858885]">{selectedLog.id}</p>
                </div>
                <div className="sm:text-right">
                  <span className={cn("inline-flex rounded border px-2 py-1 text-xs", statusStyles[selectedLog.status])}>{selectedLog.status}</span>
                  <p className="mt-3 text-sm text-[#858885]">{selectedLog.date} • {displayTime(selectedLog.time)}</p>
                </div>
              </section>

              <section className="border-b border-[#E5E8E6] py-6">
                <h3 className="font-medium text-[#292B29]">Activity Details</h3>
                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
                  <DetailField label="Activity ID">{selectedLog.id}</DetailField>
                  <DetailField label="Activity Status"><span className={cn("inline-flex rounded border px-2 py-1 text-xs", statusStyles[selectedLog.status])}>{selectedLog.status}</span></DetailField>
                  <DetailField label="Module">{selectedLog.module}</DetailField>
                  <DetailField label="Event Type">{selectedLog.event}</DetailField>
                  <DetailField label="Priority"><span className={cn("inline-flex rounded border px-2 py-1 text-xs", priorityStyles[selectedLog.priority])}>{selectedLog.priority}</span></DetailField>
                  <DetailField label="Date & Time">{selectedLog.date} • {displayTime(selectedLog.time)}</DetailField>
                  <DetailField label="Performed By">{selectedLog.performedBy}</DetailField>
                  <DetailField label="Environment">Production</DetailField>
                  <DetailField label="Source">Admin Portal</DetailField>
                </div>
              </section>

              <section className="border-b border-[#E5E8E6] py-6">
                <h3 className="font-medium text-[#292B29]">Transaction Details</h3>
                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
                  <DetailField label="Entity">{selectedLog.entity}</DetailField>
                  <DetailField label="Reference ID">{selectedLog.id}</DetailField>
                  <DetailField label="Investor">John Doe</DetailField>
                  <DetailField label="Transaction Amount">₦5,000,000</DetailField>
                  <DetailField label="Payment Method">Wallet</DetailField>
                  <DetailField label="Processing Time">2.3 Seconds</DetailField>
                  <DetailField label="Session ID">{selectedLog.id}</DetailField>
                  <DetailField label="IP Address">197.xxx.xxx.xxx</DetailField>
                </div>
              </section>

              <section className="py-6">
                <h3 className="font-medium text-[#292B29]">Event Timeline</h3>
                <ol className="mt-6">
                  {timelineEvents.map((event, index) => (
                    <li key={event} className="relative flex gap-4 pb-5 last:pb-0">
                      {index < timelineEvents.length - 1 && <span aria-hidden="true" className="absolute left-[9px] top-5 h-full w-px bg-[#68C858]" />}
                      <CircleCheck className="relative z-10 mt-0.5 size-5 shrink-0 fill-[#36B329] text-white" />
                      <div className="grid flex-1 gap-1 text-sm text-[#5F625F] sm:grid-cols-[200px_1fr] sm:gap-4">
                        <time>{selectedLog.date} • {displayTime(selectedLog.time)}</time>
                        <span>{event}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <DialogClose asChild>
                <Button variant="outline" className="h-12 w-full border-[#A8AAA8] bg-white text-base text-[#292B29] hover:bg-[#F7F8F7]">Close</Button>
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
