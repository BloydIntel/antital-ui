"use client";

import { useEffect } from "react";
import { BalanceSection } from "@/components/balance-funding/molecules/BalanceSection";
import { TYPOGRAPHY } from "@/constants/styles";
import { ShieldAlert } from "lucide-react";
import { RecentActivitySection } from "@/components/balance-funding/molecules/RecentActivitySection";
import { useDashboard } from "@/hooks/use-dashboard";
import { useWalletTransactions } from "@/hooks/use-wallet-transactions";
import { showApiErrorToast } from "@/lib/error-feedback";

export function Overview() {
    const { data, isLoading, isError, error, refetch, isFetching } = useDashboard("this-month");
    const {
        data: transactions,
        isLoading: isTransactionsLoading,
        isError: isTransactionsError,
        error: transactionsError,
    } = useWalletTransactions({ page: 1, pageSize: 3 });

    useEffect(() => {
        if (isError) {
            showApiErrorToast(error, "Unable to load wallet balance.");
        }
    }, [isError, error]);

    useEffect(() => {
        if (isTransactionsError) {
            showApiErrorToast(transactionsError, "Unable to load recent activity.");
        }
    }, [isTransactionsError, transactionsError]);

    return (
        <div>
            <BalanceSection
                availableBalance={data?.summary.availableBalance ?? 0}
                currency={data?.summary.currency}
                isLoading={isLoading}
                isRefreshing={isFetching && !isLoading}
                onRefresh={() => void refetch()}
            />

            <div className="mt-12 pt-4 pl-4 border border-[#EAEAEA]">
                <div className="flex text-[#1F1F1F] gap-2 items-center">
                    <ShieldAlert className="w-5 h-5" />
                    <p className="text-[20px]">Security Notice:</p>
                </div>
                <p className="text-[14px] text-[#505050] py-2" style={TYPOGRAPHY.body}>
                    Your funds are securely held with our partner bank, First Bank of Nigeria, not directly with Antital. All transactions are protected by bank-grade security and Nigerian banking regulations.
                </p>
            </div>

            {isTransactionsLoading ? (
                <p className="mt-8 text-[14px] text-[#858585]" style={TYPOGRAPHY.body}>
                    Loading recent activity...
                </p>
            ) : (
                <RecentActivitySection
                    userRecentActivityData={transactions?.items ?? []}
                    emptyMessage="No investment activity yet."
                />
            )}
        </div>
    );
}
