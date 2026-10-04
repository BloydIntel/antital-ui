import { ApprovalRecord } from "@/types/admin-investor-kyc";

interface ApprovalDetailsCardProps {
    record: ApprovalRecord;
    capabilities: string[];
}

export function ApprovalDetailsCard({
    record,
    capabilities,
}: ApprovalDetailsCardProps) {
    return (
        <div className="space-y-4">
            <div className="bg-white p-5 rounded-lg border border-[#EAEAEA]">
                <h3 className="font-bold text-[#11110F] mb-4">Approval Record</h3>
                <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                        <span className="text-[#858585]">Approved By</span>
                        <span className="font-medium text-[#11110F]">{record.approvedBy}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#858585]">Approved Date</span>
                        <span className="font-medium text-[#11110F]">{record.approvedDate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#858585]">Review Reference</span>
                        <span className="font-medium text-[#11110F]">{record.reviewReference}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#858585]">Investment Limit</span>
                        <span className="font-medium text-[#11110F]">{record.investmentLimit}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-[#EAEAEA]">
                <h3 className="font-bold text-[#11110F] mb-3">Capabilities Unlocked</h3>
                <div className="space-y-2">
                    {capabilities.map((capability, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 border border-gray-100 p-2.5 rounded text-xs text-[#11110F] font-medium"
                        >
                            {capability}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}