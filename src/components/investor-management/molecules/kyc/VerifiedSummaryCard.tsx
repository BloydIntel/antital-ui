import { Check, X } from "lucide-react";

interface SummaryItem {
    label: string;
    passed: boolean;
    value?: string;
}

interface VerifiedSummaryCardProps {
    title: string;
    items: SummaryItem[];
}

export function VerifiedSummaryCard({ title, items }: VerifiedSummaryCardProps) {
    return (
        <div className="bg-white rounded-lg border border-[#EAEAEA]">
            <h3 className="font-bold text-[16px] text-[#11110F] py-5 px-4 border-b border-[#EAEAEA]">{title}</h3>
            <div className="space-y-4 p-4">
                {items.map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-[14px]">
                        <span className="text-[#858585] font-bold">{item.label}</span>
                        <span className={`flex text-[16px] items-center gap-1 font-bold ${item.passed ? "text-[#45B424]" : "text-[#D4001A]"}`}>
                            {item.passed
                                ? <div className="h-3.5 w-3.5 rounded-full bg-[#45B424]"><Check className="w-3.5 h-3.5 text-white" /></div>
                                : <X className="h-4 w-4 text-[#D4001A]" />
                            }

                            {item.value || (item.passed ? "Pass" : "Failed")}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}