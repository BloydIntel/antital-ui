import { User, CheckCircle2 } from "lucide-react";

export interface EntityDetailsData {
    name: string;
    avatarInitials: string;
    entityId: string;
    type: string;
    kycVerified: boolean;
    totalInvested: string;
    accountAge: string;
    previousFlags: number;
}

interface EntityDetailsCardProps {
    data: EntityDetailsData;
    onViewProfile?: () => void;
}

export function EntityDetailsCard({ data, onViewProfile }: EntityDetailsCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[#E2E8F0] py-6 px-4">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#1B1B1B]" />
                    <h2 className="text-[18px] font-semibold text-[#11110F]">
                        Entity Details
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={onViewProfile}
                    className="text-[14px] text-[#7D8A26] hover:underline cursor-pointer"
                >
                    View Full Profile
                </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#F1F5F9] text-[#64748B] font-semibold flex items-center justify-center text-base">
                    {data.avatarInitials}
                </div>
                <div>
                    <h3 className="text-[20px] font-bold text-[#0F172A]">{data.name}</h3>
                    <div className="flex items-center gap-2 text-[14px] text-[#858585] mt-0.5">
                        <span>{data.entityId}</span>
                        <span>•</span>
                        <span>{data.type}</span>
                        {data.kycVerified && (
                            <>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1 text-[#45B424]">
                                    <CheckCircle2 className="w-3.5 h-3.5" /> KYC Verified
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-[#F1F5F94D] rounded-lg border border-[#E2E8F0] p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <p className="text-[#858585] uppercase text-[12px] tracking-wider mb-1">
                        Total Invested
                    </p>
                    <p className="text-[16px] text-[#1B1B1B]">
                        {data.totalInvested}
                    </p>
                </div>
                <div>
                    <p className="text-[#858585] uppercase text-[12px] tracking-wider mb-1">
                        Account Age
                    </p>
                    <p className="text-[16px] text-[#1B1B1B]">
                        {data.accountAge}
                    </p>
                </div>
                <div>
                    <p className="text-[#858585] uppercase text-[12px] tracking-wider mb-1">
                        Previous Flags
                    </p>
                    <p className="text-[16px] text-[#1B1B1B]">
                        {data.previousFlags}
                    </p>
                </div>
            </div>
        </div>
    );
}