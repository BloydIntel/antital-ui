import { RotateCw, Search, ShoppingCart, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TYPOGRAPHY } from "@/constants/styles";
import { MarketType, RiskLevel, Sector } from "@/types/dashboard";

interface MarketFilterBarProps {
    marketType: MarketType;
    activeSector: Sector; // Updated from string
    onSectorChange: (sector: Sector) => void;
    activeRisk: RiskLevel | "all";
    onRiskChange: (risk: RiskLevel | "all") => void;
    tradeType?: "buy" | "sell";
    onTradeTypeChange?: (type: "buy" | "sell") => void;
    onRefresh?: () => void;
}

const sectors: Sector[] = ["All Sector", "Technology", "Health", "Energy", "Agriculture"];

export function MarketFilterBar({ marketType, activeSector, onSectorChange, activeRisk, onRiskChange, tradeType, onTradeTypeChange, onRefresh }: MarketFilterBarProps) {

    const isPrimary = marketType === "primary";

    return (
        <div className="flex flex-col items-center xl:flex-row xl:justify-between gap-4 w-full pt-4 pb-8">
            {isPrimary ? (
                <div className="flex items-center bg-[#E6EAE9] p-1 rounded-lg w-auto">
                    {sectors.map((sector) => (
                        <button
                            key={sector}
                            onClick={() => onSectorChange(sector)}
                            className={cn(
                                "px-2 lg:px-4 py-2 text-[11px] lg:text-[14px] rounded-md cursor-pointer transition-all whitespace-nowrap",
                                activeSector === sector
                                    ? "bg-[#052119] text-white shadow-sm"
                                    : "text-[#505050] hover:text-black"
                            )}
                        >
                            {sector}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex items-center gap-1 bg-[#E6EAE9] p-1 rounded">
                    <button
                        onClick={() => onTradeTypeChange?.("buy")}
                        className={cn(
                            "flex items-center gap-2 p-2 text-[16px] rounded-md cursor-pointer transition-all",
                            tradeType === "buy" ? "bg-[#052119] text-white shadow-sm" : "text-[#505050] hover:text-[#052119]"
                        )}
                    >
                        <ShoppingCart size={16} /> Buy Shares
                    </button>
                    <button
                        onClick={() => onTradeTypeChange?.("sell")}
                        className={cn(
                            "flex items-center gap-2 p-2 text-[16px] rounded-md cursor-pointer transition-all",
                            tradeType === "sell" ? "bg-[#052119] text-white shadow-sm" : "text-[#505050] hover:text-[#052119]"
                        )}
                    >
                        <Upload size={16} /> Sell Shares
                    </button>
                </div>
            )}


            <div className="flex items-center justify-center gap-3 w-full lg:w-auto">
                <div className="flex items-center gap-3 ">
                    <Select value={activeRisk} onValueChange={onRiskChange}>
                        <SelectTrigger className="py-2 px-4 border-[#A8A8A8] rounded-xs bg-white cursor-pointer">
                            <div className="flex items-center gap-2">
                                <SelectValue placeholder="All Risk" className="text-[16px] text-[#000000]" style={TYPOGRAPHY.heading} />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Risk</SelectItem>
                            <SelectItem value="low">Low Risk</SelectItem>
                            <SelectItem value="moderate">Medium Risk</SelectItem>
                            <SelectItem value="high">High Risk</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {isPrimary ? (
                    <div className="relative w-full lg:w-[371px]">
                        <Input
                            type="search"
                            placeholder="Search"
                            className="h-[40px] px-4 pr-12 bg-[#EAEAEA] border-[#EAEAEA] rounded-xs text-[16px]"
                            style={TYPOGRAPHY.body}
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A2A3A1]" />
                    </div>
                ) : (
                    <button
                        onClick={onRefresh}
                        className="flex items-center gap-2 h-[40px] px-4 border border-[#A8A8A8] rounded-md bg-white hover:bg-gray-50 text-[16px] transition-colors"
                        style={TYPOGRAPHY.body}
                    >
                        <RotateCw size={18} className="text-[#323232]" />
                        Refresh
                    </button>
                )}
            </div>
        </div>
    );
}