
interface StatusBadgeProps {
    status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    if (status === "Flagged") {
        return (
            <span className="inline-flex items-center rounded-md bg-[#FCFCFC] border border-[#EAEAEA] px-2.5 py-1 text-[12px] text-[#D4001A]">
                Flagged
            </span>
        );
    }

    if (status === "Pending" || status === "Hold") {
        return (
            <span className="inline-flex items-center rounded-md bg-[#FCFCFC] border border-[#EAEAEA] px-2.5 py-1 text-[12px] text-[#D97706]">
                {status}
            </span>
        );
    }

    return (
        <span className="inline-flex items-center rounded-md bg-[#FCFCFC] border border-[#EAEAEA] px-2.5 py-1 text-[12px] text-[#45B424]">
            Completed
        </span>
    );
}