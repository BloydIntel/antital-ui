

export function StatusButton({ status }: { status: "Completed" | "Pending" | "Failed" }) {
    return (
        <span className="px-1 py-0.5 text-[14px] text-white bg-[#22C55E] rounded-sm">
            {status}
        </span>
    )
}
