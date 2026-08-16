import { TYPOGRAPHY } from "@/constants/styles";
import React from "react";

interface AlertTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const TABS = ["All Alerts", "AML/Fraud", "Regulatory", "Operational"];

export function AlertTabs({ activeTab, onTabChange }: AlertTabsProps) {
    return (
        <div className="flex border-b border-gray-100 pt-4 bg-white rounded-t-xl max-w-full overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`pb-3 px-6.5 text-sm transition-colors relative cursor-pointer whitespace-nowrap shrink-0 ${isActive
                            ? "text-[#042E27]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                        style={TYPOGRAPHY.body}
                    >
                        {tab}
                        {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#CAD484]" />
                        )}
                    </button>
                );
            })}
        </div>
    );
}