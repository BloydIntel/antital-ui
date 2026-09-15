import { PortfolioStatus } from "@/types/portfolio";

interface PortfolioStatusBadgeProps {
    status: PortfolioStatus;
}

export function PortfolioStatusBadge({ status }: PortfolioStatusBadgeProps) {
    if (status === "PERFORMING") {
        return (
            <span className="inline-flex items-center rounded-md bg-[#F0FDF4] border border-[#DCFCE7] px-2.5 py-1 text-[11px] font-semibold text-[#16A34A] tracking-wider uppercase">
                PERFORMING
            </span>
        );
    }

    if (status === "PENDING CLOSE") {
        return (
            <span className="inline-flex items-center rounded-md bg-[#FFFBEB] border border-[#FEF3C7] px-2.5 py-1 text-[11px] font-semibold text-[#D97706] tracking-wider uppercase">
                PENDING CLOSE
            </span>
        );
    }

    return (
        <span className="inline-flex items-center rounded-md bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-1 text-[11px] font-semibold text-[#64748B] tracking-wider uppercase">
            EXITED
        </span>
    );
}