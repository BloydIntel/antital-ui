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
        <div className="bg-white rounded-md">

            <div className="flex items-center justify-between border-b border-[#EAEAEA] py-4 px-6">
                <h3 className="text-[16px] font-medium text-[#040C17]">Active Portfolio</h3>
                <button
                    type="button"
                    onClick={onViewAll}
                    className="text-[16px] font-medium text-[#7BA147] hover:text-[#7BA147]/70 hover:underline transition-colors cursor-pointer"
                >
                    View all
                </button>
            </div>

            {/* Table content section */}
            <div className="pt-3 px-4 overflow-x-auto scrollbar-hide">
                <table className="w-full min-w-[450px] text-left border-collapse">
                    <thead>
                        <tr className="text-[14px] text-[#1F1F1F] border-b border-[#EAEAEA]">
                            <th className="pb-3 font-normal">Campaign</th>
                            <th className="pb-3 font-normal">Instrument</th>
                            <th className="pb-3 font-normal">Amount</th>
                            <th className="pb-3 font-normal">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAEAEA] text-[14px]">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-[#FAFBFD]">
                                <td className="py-6 text-[#2C2C2C]">
                                    {item.campaign}
                                </td>
                                <td className="py-6 text-[#2C2C2C]">
                                    {item.instrument}
                                </td>
                                <td className="py-6 text-[#2C2C2C]">
                                    {item.amount}
                                </td>
                                <td className="py-6 text-[#45B424]">
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