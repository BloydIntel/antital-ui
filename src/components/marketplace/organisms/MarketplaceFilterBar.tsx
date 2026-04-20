import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TYPOGRAPHY } from "@/constants/styles";

interface MarketFilterBarProps {
    activeSector: string;
    onSectorChange: (sector: string) => void;
    activeRisk: string; // Add this
    onRiskChange: (risk: string) => void;
}

const sectors = ["All Sector", "Technology", "Health", "Energy", "Agriculture"];

export function MarketFilterBar({ activeSector, onSectorChange, activeRisk, onRiskChange }: MarketFilterBarProps) {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full pt-4 pb-8">
            {/* Sector Navigation */}
            <div className="flex items-center bg-[#E6EAE9] p-1 rounded-lg w-auto">
                {sectors.map((sector) => (
                    <button
                        key={sector}
                        onClick={() => onSectorChange(sector)}
                        className={cn(
                            "px-2 lg:px-4 py-2 text-[11px] lg:text-[14px] rounded-md cursor-pointer transition-all",
                            activeSector === sector
                                ? "bg-[#052119] text-white"
                                : "text-[#505050] hover:text-black"
                        )}
                    >
                        {sector}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
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

                <div className="relative w-full lg:w-[371px]">
                    <Input type="search" placeholder="Search" className="h-[40px] px-4 pr-12 bg-[#EAEAEA] border-[#EAEAEA] rounded-xs text-[16px]" style={TYPOGRAPHY.body} />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A2A3A1]" />
                </div>
            </div>
        </div>
    );
}