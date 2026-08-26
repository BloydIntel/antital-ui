import { ReactNode } from "react";

interface DetailGridItemProps {
    label: string;
    value: ReactNode;
}

export function DetailGridItem({ label, value }: DetailGridItemProps) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-[14px] text-[#858585] font-normal">{label}</span>
            <span className="text-[16px] text-[#1B1B1B]">{value}</span>
        </div>
    );
}