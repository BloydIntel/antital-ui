
interface DetailGridItemProps {
    label: string;
    value: React.ReactNode;
}

export function DetailGridItem({ label, value }: DetailGridItemProps) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[13px] text-[#858585] font-normal">{label}</span>
            <span className="text-[14px] text-[#1B1B1B] font-medium">{value}</span>
        </div>
    );
}