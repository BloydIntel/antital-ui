"use client"

import { SquarePen, Trash, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuestionValue, useOnboardingStore } from "@/store/onboardingStore";

interface ReviewItem {
    label: string | undefined;
    value: QuestionValue | string | File | boolean | null;
}

interface ReviewCardProps {
    title: string;
    sectionId: string;
    items: ReviewItem[];
    isStatusType?: boolean;
    onEditClick?: () => void;
}

export function ReviewCard({ title, items, isStatusType, onEditClick }: ReviewCardProps) {
    const { investorUserType } = useOnboardingStore();

    const formatValue = (item: ReviewItem): string => {
        const val = item.value;
        const label = item.label?.toLowerCase();
        const isCorporate = investorUserType === "corporate";

        if (val === null || val === undefined) return "Not set";

        if (val instanceof File || val === "File Uploaded") {
            if (isCorporate) {
                return label?.includes("selfie") ? "Verified" : "Uploaded";
            }
            return "Completed";
        }

        if (Array.isArray(val)) return val.join(", ");
        if (typeof val === "object" && "amount" in val) return val.amount;

        if (val === "Completed" && isCorporate) {
            return label?.includes("selfie") ? "Verified" : "Uploaded";
        }

        return String(val);
    }

    return (
        <div className="p-4 border border-[#EAEAEA] rounded-xl bg-white">
            <div className="flex justify-between items-center mb-4 pb-[18px] border-b border-[#EAEAEA]">
                <h3 className="text-[16px] font-medium text-[#2C2C2C]">{title}</h3>

                <div className="flex items-center gap-3">
                    {isStatusType ? (

                        <>
                            <button onClick={onEditClick} className="hover:opacity-70 transition-all cursor-pointer" aria-label="Edit section">
                                <SquarePen size={18} className="text-[#2C2C2C]" />
                            </button>
                            <button className="hover:opacity-70 transition-all cursor-pointer">
                                <Trash size={18} className="text-[#2C2C2C]" />
                            </button>
                        </>
                    ) : (

                        <button
                            onClick={onEditClick}
                            className="flex items-center gap-2 text-[#A7B832] hover:opacity-70 transition-all cursor-pointer"
                            aria-label="Edit section"
                        >
                            <span className="text-sm font-medium">Edit</span>
                            <SquarePen size={16} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {items.map((item, idx) => {
                    const displayValue = formatValue(item);
                    const isSuccess = ["Completed", "Uploaded", "Verified", "File Uploaded"].includes(displayValue);

                    return (
                        <div key={idx} className="flex justify-between items-start gap-4">
                            <span className="text-[#858585] text-[14px] whitespace-nowrap">{item.label}</span>
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "text-[14px] text-right break-words",
                                    isStatusType ? "text-[#4A4A4A]" : "text-[#2C2C2C] font-medium"
                                )}>
                                    {displayValue}
                                </span>
                                {isStatusType && isSuccess && (
                                    <CheckCircle2 size={16} className="text-[#3EA34B]" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}