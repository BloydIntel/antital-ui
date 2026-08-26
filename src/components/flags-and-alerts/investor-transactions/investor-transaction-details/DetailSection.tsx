import { ReactNode } from "react";

interface DetailSectionProps {
    title: string;
    children: ReactNode;
}

export function DetailSection({ title, children }: DetailSectionProps) {
    return (
        <div className="pt-[18px] border-t border-[#EAEAEA]">
            <h3 className="text-[16px] font-medium text-[#11110F] pb-4">{title}</h3>
            <div className="space-y-[34px]">
                {children}
            </div>
        </div>
    );
}