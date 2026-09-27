"use client";

import { useMemo, useState } from "react";
import { Upload } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { Investor, MetricCardData } from "@/types/investor";
import { InvestorMetrics } from "@/components/investor-management/molecules/InvestorMetrics";
import { InvestorTable } from "@/components/investor-management/molecules/InvestorTable";
import { TablePagination } from "@/components/watchlist/molecules/TablePagination";
import { TYPOGRAPHY } from "@/constants/styles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

const DATE_RANGE_OPTIONS = [
    "All Time",
    "Last 7 Days",
    "Last 30 Days",
    "Last Month",
    "Last 90 Days",
    "Year to Date",
] as const;

const DATE_LABEL_MAP: Record<DateRangeOption, string> = {
    "All Time": "all time",
    "Last 7 Days": "this week",
    "Last 30 Days": "last 30 days",
    "Last Month": "last month",
    "Last 90 Days": "last 90 days",
    "Year to Date": "this year",
};

export type DateRangeOption = (typeof DATE_RANGE_OPTIONS)[number];


const MOCK_INVESTORS: Investor[] = [
    {
        id: "INV-8921",
        name: "Sarah Mitchell",
        email: "sarah.m@example.com",
        initials: "SM",
        walletBalance: "₦1,450,000.00",
        joinedDate: "Nov 23, 2024",
        status: "Active",
    },
    {
        id: "INV-8931",
        name: "John Doe",
        email: "johndoe@example.com",
        initials: "JD",
        walletBalance: "₦124,500.00",
        joinedDate: "Oct 31, 2024",
        status: "Active",
    },
    {
        id: "INV-8923",
        name: "Emeka Ofor",
        email: "eofor.biz@example.com",
        initials: "EO",
        walletBalance: "₦0.00",
        joinedDate: "Jan 04, 2024",
        status: "Pending KYC",
    },
    {
        id: "INV-8924",
        name: "Aisha Bello",
        email: "abello99@example.com",
        initials: "AB",
        walletBalance: "₦45,200.00",
        joinedDate: "Feb 02, 2024",
        status: "Suspended",
    },
    {
        id: "INV-8925",
        name: "Daniel Okafor",
        email: "dan.ok@example.com",
        initials: "DO",
        walletBalance: "₦320,000.00",
        joinedDate: "Sep 22, 2024",
        status: "Active",
    },
    {
        id: "INV-8926",
        name: "Chioma Ndubuisi",
        email: "c.ndubuisi@example.com",
        initials: "CN",
        walletBalance: "₦2,100,000.00",
        joinedDate: "May 15, 2024",
        status: "Active",
    },
    {
        id: "INV-8927",
        name: "Femi Adebayo",
        email: "femia@example.com",
        initials: "FA",
        walletBalance: "₦0.00",
        joinedDate: "Mar 12, 2024",
        status: "Pending KYC",
    },
];

const TABS = ["All Investors", "Pending KYC", "Suspended", "High Net Worth"] as const;

export default function InvestorManagementPage() {

    const router = useRouter();

    const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All Investors");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(7);
    const [selectedDateRange, setSelectedDateRange] = useState<DateRangeOption | "">("");

    const metricsData: MetricCardData[] = [
        {
            title: "Total Investors",
            value: "14,596",
            changeValue: 124, // Positive (+124) -> yields #45B424
            subtext: "",
        },
        {
            title: "Pending KYC",
            value: "342", // Metric value automatically colored #F4B942
            subtext: "Requires manual review",
        },
        {
            title: "Suspended Accounts",
            value: "28", // Metric value automatically colored #D4001A
            subtext: "AML/Fraud locked",
        },
        {
            title: "Total Wallet Balance",
            value: "₦84.2M",
            subtext: "Access all accounts",
        },
    ];


    // Filter list based on selected tab
    const filteredInvestors = useMemo(() => {
        if (activeTab === "Pending KYC") {
            return MOCK_INVESTORS.filter((inv) => inv.status === "Pending KYC");
        }
        if (activeTab === "Suspended") {
            return MOCK_INVESTORS.filter((inv) => inv.status === "Suspended");
        }
        return MOCK_INVESTORS;
    }, [activeTab]);

    // Dynamic calculations derived from the dataset
    const totalRecords = filteredInvestors.length;
    const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

    // Slice dataset for client-side pagination
    const paginatedInvestors = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredInvestors.slice(start, start + pageSize);
    }, [filteredInvestors, currentPage, pageSize]);

    const currentRangeLabel = selectedDateRange
        ? DATE_LABEL_MAP[selectedDateRange]
        : "this period";

    const handleTabChange = (tab: (typeof TABS)[number]) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handleDateRangeChange = (value: string) => {
        setSelectedDateRange(value as DateRangeOption);
        setCurrentPage(1);
    };

    const handleExport = () => {
        // Export logic
    };

    const handleViewProfile = (investor: Investor) => {
        router.push(`/investor-profile/${investor.id}`);
    };

    const handleReviewDocument = (investor: Investor) => {
        // Open Document Viewer modal
        console.log(investor);
    };

    const handleReviewCase = (investor: Investor) => {
        // Open Case review
        console.log(investor);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-[28px] text-[#040C17] mb-1" style={TYPOGRAPHY.heading}>Investor Management</h1>
                    <p className="text-[16px] text-[#666666]">
                        Manage user profiles, review KYC, and monitor account health
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="w-fit">
                        <Select
                            value={selectedDateRange}
                            onValueChange={handleDateRangeChange}
                        >
                            <SelectTrigger className="w-full px-3 border-[#EAEAEA] bg-white rounded-lg cursor-pointer text-[#2C2C2C] !h-[42px] text-[14px]">
                                <div className="flex items-center gap-1.5 truncate">
                                    <SelectValue placeholder="Filter by Priority" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-[#EAEAEA] rounded-md z-50">
                                {DATE_RANGE_OPTIONS.map((opt) => (
                                    <SelectItem key={opt} value={opt} className="text-[13px] cursor-pointer">
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <OnboardingButton
                        label="Export"
                        icon={<Upload className="w-4 h-4 text-white" />}
                        onClick={handleExport}
                        className="my-0 max-w-[200px] lg:w-fit text-[14px] h-[42px]"
                    />
                </div>
            </div>

            {/* Metrics */}
            <InvestorMetrics metrics={metricsData} dateRangeLabel={currentRangeLabel} />

            {/* Table Container Card */}
            <div className="bg-white rounded-xl border border-[#EAEAEA] px-4">
                {/* Tabs */}
                <div className="flex items-center gap-6 border-b border-[#EAEAEA] overflow-x-auto scrollbar-hide -mx-4">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => handleTabChange(tab)}
                            className={`py-4 px-4 text-[14px] font-medium transition-colors relative whitespace-nowrap shrink-0 cursor-pointer ${activeTab === tab ? "text-[#7BA147]" : "text-[#858585] hover:text-[#11110F]"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7BA147] rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Table */}
                <InvestorTable
                    investors={paginatedInvestors}
                    onViewProfile={handleViewProfile}
                    onReviewDocument={handleReviewDocument}
                    onReviewCase={handleReviewCase}
                />

                {/* Dynamic Table Pagination */}
                <TablePagination
                    variant="detailed"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    pageSize={pageSize}
                    onPageChange={(page: number) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}