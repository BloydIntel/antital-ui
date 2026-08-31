"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { AlertItem, AlertSummary } from "@/types/flags-and-alerts";
import { AlertSummaryCards } from "@/components/flags-and-alerts/AlertSummaryCards";
import { AlertTabs } from "@/components/flags-and-alerts/AlertTabs";
import { AlertsTable } from "@/components/flags-and-alerts/AlertsTable";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { TYPOGRAPHY } from "@/constants/styles";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { useRouter } from "next/navigation";

const MOCK_SUMMARY: AlertSummary = {
    criticalAlerts: 12,
    warnings: 48,
    actionedToday: 8,
};

const MOCK_ALERTS: AlertItem[] = [
    {
        id: "1",
        flagId: "FLG-1092",
        timeAgo: "10 mins ago",
        type: "AML/Fraud",
        severity: "CRITICAL",
        entityAffected: "INV-8921 (John Doe)",
        description: "Large transaction from blacklisted IP",
    },
    {
        id: "2",
        flagId: "FLG-1091",
        timeAgo: "1 hour ago",
        type: "Regulatory",
        severity: "HIGH",
        entityAffected: "Platform",
        description: "SEC Q3 Report submission deadline approaching (2 days)",
    },
    {
        id: "3",
        flagId: "FLG-1090",
        timeAgo: "3 hours ago",
        type: "Operational",
        severity: "MEDIUM",
        entityAffected: "CMP-104 (AgriGrow)",
        description: "Escrow release blocked due to missing signature",
    },
    {
        id: "4",
        flagId: "FLG-1089",
        timeAgo: "5 hours ago",
        type: "AML/Fraud",
        severity: "HIGH",
        entityAffected: "TRD-4432 (Sec. Market)",
        description: "Suspicious wash trading pattern detected",
    },
    {
        id: "5",
        flagId: "FLG-1088",
        timeAgo: "1 day ago",
        type: "Operational",
        severity: "LOW",
        entityAffected: "INV-7732 (Jane Smith)",
        description: "Investment cap breach warning (close to limit)",
    },
    {
        id: "6",
        flagId: "FLG-1087",
        timeAgo: "1 day ago",
        type: "AML/Fraud",
        severity: "CRITICAL",
        entityAffected: "INV-3321 (Alice Johnson)",
        description: "Multiple failed login attempts followed by high transfer",
    },
    {
        id: "7",
        flagId: "FLG-1086",
        timeAgo: "2 days ago",
        type: "Regulatory",
        severity: "MEDIUM",
        entityAffected: "Platform",
        description: "Annual KYC audit log update required",
    },
    {
        id: "8",
        flagId: "FLG-1085",
        timeAgo: "2 days ago",
        type: "Operational",
        severity: "HIGH",
        entityAffected: "CMP-202 (TechFund)",
        description: "Disbursement payout failure on active node",
    },
    {
        id: "9",
        flagId: "FLG-1084",
        timeAgo: "3 days ago",
        type: "AML/Fraud",
        severity: "LOW",
        entityAffected: "INV-1102 (Bob Brown)",
        description: "Unusual profile update from new location",
    },
    {
        id: "10",
        flagId: "FLG-1083",
        timeAgo: "3 days ago",
        type: "Operational",
        severity: "CRITICAL",
        entityAffected: "TRD-1029 (Crypto Pair)",
        description: "API key exposure detected on public repository",
    },
];

const INITIAL_LOAD_COUNT = 5;
const LOAD_MORE_INCREMENT = 5;

export default function FlagsAndAlertsPage() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("All Alerts");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

    const filteredAlerts = MOCK_ALERTS.filter((alert) => {
        const matchesTab = activeTab === "All Alerts" || alert.type === activeTab;
        const matchesPriority = priorityFilter === "all" || alert.severity === priorityFilter;
        return matchesTab && matchesPriority;
    });

    const displayedAlerts = filteredAlerts.slice(0, visibleCount);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setVisibleCount(INITIAL_LOAD_COUNT);
    };

    const handlePriorityChange = (priority: string) => {
        setPriorityFilter(priority);
        setVisibleCount(INITIAL_LOAD_COUNT);
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + LOAD_MORE_INCREMENT);
    };

    const handleExport = () => {
        const headings = ["Flag ID", "Time", "Type", "Severity", "Entity Affected", "Description"];

        const rows = filteredAlerts.map((alert) => [
            alert.flagId,
            alert.timeAgo,
            alert.type,
            alert.severity,
            alert.entityAffected,
            alert.description,
        ]);

        const csv = [headings, ...rows]
            .map((row) =>
                row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")
            )
            .join("\n");

        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `flags-and-alerts-${new Date().toISOString().split("T")[0]}.csv`;
        anchor.click();

        URL.revokeObjectURL(url);
    };

    const handleInvestigate = (alert: AlertItem) => {

        router.push(`/flags-and-alerts/investigation/${alert.flagId}`);
    };

    return (
        <main className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-[24px] lg:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>Flags and Alerts</h1>
                    <p className="text-[14px] lg:text-[16px] text-[#505050] mt-1">
                        Monitor platform activity, performance, and operations in real time
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Priority Select Filter */}
                    <div className="relative w-full sm:w-auto">
                        <Select value={priorityFilter} onValueChange={handlePriorityChange}>
                            <SelectTrigger className="h-10 w-full sm:w-[170px] border-[#A8A8A8] rounded-sm bg-white cursor-pointer px-3 py-2 text-[14px] text-[#11110F] focus:border-[#A8BD27] focus:ring-2 focus:ring-[#A8BD27]/20 [&_svg]:transition-transform [&_svg]:duration-200 data-[state=open]:[&_svg]:rotate-180">
                                <SelectValue>
                                    {priorityFilter === "all"
                                        ? "Filter by Priority"
                                        : priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1).toLowerCase()}
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="CRITICAL">Critical</SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                    <SelectItem value="LOW">Low</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <OnboardingButton
                        variant="solid"
                        type="button"
                        label="Export"
                        onClick={handleExport}
                        icon={<Upload className="w-4 h-4" />}
                        className="my-0 w-fit"
                    />
                </div>
            </div>

            {/* Summary Stat Cards */}
            <AlertSummaryCards summary={MOCK_SUMMARY} />

            {/* Table Section with Tabs */}
            <div>
                <AlertTabs activeTab={activeTab} onTabChange={handleTabChange} />
                <AlertsTable
                    alerts={displayedAlerts}
                    onInvestigate={handleInvestigate}
                    onLoadMore={visibleCount < filteredAlerts.length ? handleLoadMore : undefined}
                />
            </div>
        </main>
    );
}