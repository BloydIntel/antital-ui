interface StatusBadgeProps {
    status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    if (status === "Flagged" || status === "Failed") {
        return (
            <span className="inline-flex items-center justify-center rounded-md bg-[#FCFCFC] border border-[#EAEAEA] px-2.5 py-1 text-[12px] w-full max-w-[75px] text-[#D4001A]">
                {status}
            </span>
        );
    }

    if (status === "Pending" || status === "Hold") {
        return (
            <span className="inline-flex items-center justify-center rounded-md bg-[#FCFCFC] border border-[#EAEAEA] px-2.5 py-1 text-[12px] w-full max-w-[75px] text-[#D97706]">
                {status}
            </span>
        );
    }

    return (
        <span className="inline-flex items-center justify-center rounded-md bg-[#FCFCFC] border border-[#EAEAEA] px-2.5 py-1 text-[12px] w-full max-w-[75px] text-[#45B424]">
            {status === "Completed" ? "Completed" : status}
        </span>
    );
}