import { AuditTrailItem } from "@/types/admin-investor-kyc";

interface ApprovalAuditTrailProps {
    trail: AuditTrailItem[];
}

export function ApprovalAuditTrail({ trail }: ApprovalAuditTrailProps) {
    return (
        <div className="bg-white p-5 rounded-lg border border-[#EAEAEA]">
            <h3 className="font-bold text-[#11110F] mb-4">Approval Audit Trail</h3>
            <div className="space-y-4">
                {trail.map((item) => (
                    <div key={item.id} className="border-l-2 border-[#30534C] pl-3 py-0.5">
                        <p className="text-xs font-bold text-[#11110F]">{item.title}</p>
                        <p className="text-[11px] text-[#858585] mt-0.5">
                            {item.performedBy} • {item.timestamp}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}