import { ApprovalRecord } from "@/types/admin-investor-kyc";

interface ApprovalDetailsCardProps {
    record: ApprovalRecord;
    capabilities: string[];
}


export function ApprovalDetailsCard({
    record,
    capabilities,
}: ApprovalDetailsCardProps) {

    const DETAILS = [
        { label: "Approved By", value: record.approvedBy },
        { label: "Approved Date", value: record.approvedDate },
        { label: "Review Reference", value: record.reviewReference },
        {
            label: "Investment Limit",
            value: record.investmentLimit,
            isHighlight: true,
        },
    ];

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-lg border border-[#EAEAEA]">
                <h3 className="font-bold text-[16px] text-[#11110F] py-5 px-4 border-b border-[#EAEAEA]">Approval Record</h3>
                <div className="space-y-2 text-[14px] p-4">
                    {DETAILS.map(({ label, value, isHighlight }) => (
                        <div key={label} className="flex justify-between">
                            <span className="text-[#858585]">{label}</span>
                            <span
                                className={`font-medium ${isHighlight ? "text-[#7BA147]" : "text-[#858585]"
                                    }`}
                            >
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg border border-[#EAEAEA]">
                <h3 className="font-bold text-[16px] text-[#11110F] py-5 px-4 border-b border-[#EAEAEA]">Capabilities Unlocked</h3>
                <div className="space-y-2 p-4">
                    {capabilities.map((capability, index) => (
                        <div
                            key={index}
                            className="bg-[#FCFCFC] border border-[#EAEAEA] p-2 rounded-lg text-[14px] text-[#2C2C2C]"
                        >
                            {capability}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}