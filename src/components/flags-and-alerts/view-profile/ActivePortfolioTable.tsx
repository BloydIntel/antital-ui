"use client";

export interface PortfolioItem {
    id: string;
    campaign: string;
    instrument: string;
    amount: string;
    status: "Performing" | "Performing Close" | string;
}

interface ActivePortfolioProps {
    items: PortfolioItem[];
    onViewAll?: () => void;
}

export function ActivePortfolioTable({ items, onViewAll }: ActivePortfolioProps) {
    return (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                <h3 className="text-[15px] font-bold text-[#11110F]">Active Portfolio</h3>
                <button
                    type="button"
                    onClick={onViewAll}
                    className="text-[13px] font-medium text-[#858585] hover:text-[#11110F] transition-colors cursor-pointer"
                >
                    View all
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[12px] font-medium text-[#858585] border-b border-[#F1F5F9]">
                            <th className="pb-3 font-normal">Campaign</th>
                            <th className="pb-3 font-normal">Instrument</th>
                            <th className="pb-3 font-normal">Amount</th>
                            <th className="pb-3 font-normal text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F8F9FA] text-[13px]">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-[#FAFBFD]">
                                <td className="py-3.5 font-medium text-[#11110F]">
                                    {item.campaign}
                                </td>
                                <td className="py-3.5 text-[#64748B]">
                                    {item.instrument}
                                </td>
                                <td className="py-3.5 font-semibold text-[#11110F]">
                                    {item.amount}
                                </td>
                                <td className="py-3.5 text-right font-medium text-[#10B981]">
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}