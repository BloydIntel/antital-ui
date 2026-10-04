"use client";
import { Upload } from "lucide-react";
import { AlertItem } from "@/types/flags-and-alerts";
import { AlertSummaryCards } from "@/components/flags-and-alerts/AlertSummaryCards";
import { AlertTabs } from "@/components/flags-and-alerts/AlertTabs";
import { AlertsTable } from "@/components/flags-and-alerts/AlertsTable";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { TYPOGRAPHY } from "@/constants/styles";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAdminAlerts } from "@/hooks/use-admin-alerts";
import service from "@/services/adminAlertsService";

const PAGE_SIZE = 10;
const tabType: Record<string, string | undefined> = { "All Alerts": undefined, "AML/Fraud": "AML/Fraud", Regulatory: "Regulatory", Operational: "Operational" };
const relativeTime = (value: string) => { const minutes = Math.max(1, Math.round((Date.now() - new Date(value).getTime()) / 60000)); return minutes < 60 ? `${minutes} mins ago` : minutes < 1440 ? `${Math.round(minutes / 60)} hours ago` : `${Math.round(minutes / 1440)} days ago`; };

export default function FlagsAndAlertsPage() {
  const router = useRouter(); const [activeTab, setActiveTab] = useState("All Alerts"); const [priorityFilter, setPriorityFilter] = useState("all"); const [page, setPage] = useState(1);
  const params = useMemo(() => ({ page, pageSize: PAGE_SIZE, type: tabType[activeTab], severity: priorityFilter === "all" ? undefined : priorityFilter }), [activeTab, page, priorityFilter]);
  const { data, isLoading, isError, refetch } = useAdminAlerts(params);
  const alerts: AlertItem[] = (data?.items ?? []).map(item => ({ id: String(item.id), flagId: item.flagId, timeAgo: relativeTime(item.occurredAtUtc), type: item.type, severity: item.severity, entityAffected: item.entityAffected, description: item.description }));
  const exportAlerts = async () => {
    const exportRows: AlertItem[] = [];
    const first = await service.getAlerts({ ...params, page: 1, pageSize: 100 });
    exportRows.push(...first.items.map(item => ({ id: String(item.id), flagId: item.flagId, timeAgo: relativeTime(item.occurredAtUtc), type: item.type, severity: item.severity, entityAffected: item.entityAffected, description: item.description })));
    for (let currentPage = 2; currentPage <= first.totalPages; currentPage += 1) {
      const next = await service.getAlerts({ ...params, page: currentPage, pageSize: 100 });
      exportRows.push(...next.items.map(item => ({ id: String(item.id), flagId: item.flagId, timeAgo: relativeTime(item.occurredAtUtc), type: item.type, severity: item.severity, entityAffected: item.entityAffected, description: item.description })));
    }
    const rows = [["Flag ID", "Time", "Type", "Severity", "Entity Affected", "Description"], ...exportRows.map(a => [a.flagId, a.timeAgo, a.type, a.severity, a.entityAffected, a.description])]; const csv = rows.map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n"); const anchor = document.createElement("a"); anchor.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); anchor.download = `flags-and-alerts-${new Date().toISOString().slice(0, 10)}.csv`; anchor.click(); URL.revokeObjectURL(anchor.href);
  };
  const changeTab = (tab: string) => { setActiveTab(tab); setPage(1); }; const changePriority = (value: string) => { setPriorityFilter(value); setPage(1); };
  return <main className="space-y-6"><div className="flex flex-col md:flex-row md:items-center justify-between gap-4"><div><h1 className="text-[24px] lg:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>Flags and Alerts</h1><p className="text-[14px] lg:text-[16px] text-[#505050] mt-1">Monitor platform activity, performance, and operations in real time</p></div><div className="flex items-center gap-3"><Select value={priorityFilter} onValueChange={changePriority}><SelectTrigger className="h-10 w-full sm:w-[170px] border-[#A8A8A8] rounded-sm bg-white"><SelectValue placeholder="Filter by Priority" /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="all">All</SelectItem><SelectItem value="CRITICAL">Critical</SelectItem><SelectItem value="HIGH">High</SelectItem><SelectItem value="MEDIUM">Medium</SelectItem><SelectItem value="LOW">Low</SelectItem></SelectGroup></SelectContent></Select><OnboardingButton variant="solid" type="button" label="Export" onClick={exportAlerts} icon={<Upload className="w-4 h-4" />} className="my-0 w-fit" /></div></div><AlertSummaryCards summary={data?.summary ?? { criticalAlerts: 0, warnings: 0, actionedToday: 0 }} /><div><AlertTabs activeTab={activeTab} onTabChange={changeTab} />{isLoading ? <div className="bg-white p-10 text-center">Loading alerts…</div> : isError ? <div className="bg-white p-10 text-center">Unable to load alerts. <button className="underline" onClick={() => refetch()}>Retry</button></div> : alerts.length === 0 ? <div className="bg-white p-10 text-center">No alerts match these filters.</div> : <AlertsTable alerts={alerts} onInvestigate={alert => router.push(`/flags-and-alerts/investigation/${alert.flagId}`)} />}</div>{data && data.totalPages > 1 && <div className="flex justify-center gap-4 text-sm"><button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="disabled:opacity-40">Previous</button><span>Page {page} of {data.totalPages}</span><button disabled={page >= data.totalPages} onClick={() => setPage(p => p + 1)} className="disabled:opacity-40">Next</button></div>}</main>;
}
