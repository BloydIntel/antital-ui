import { AuditTrailItem } from "@/types/admin-investor-kyc";

interface ApprovalAuditTrailProps {
    trail: AuditTrailItem[];
}

export function ApprovalAuditTrail({ trail }: ApprovalAuditTrailProps) {
    return (
        <div className="bg-white rounded-lg border border-[#EAEAEA]">
            <h3 className="font-bold text-[16px] text-[#11110F] py-5 px-4 border-b border-[#EAEAEA]">Approval Audit Trail</h3>
            <div className="space-y-5 p-4">
                {trail.map((item) => (
                    <div key={item.id}>
                        <p className="text-[16px] text-[#11110F]">{item.title}</p>
                        <p className="text-[14px] text-[#858585] mt-2">
                            {item.performedBy} • {item.timestamp}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}