import { TYPOGRAPHY } from "@/constants/styles";

export interface AuditTrailItem {
    id: string;
    event: string;
    details: string;
    time: string;
    color: "blue" | "red" | "green" | "gray";
}

interface AuditTrailCardProps {
    items: AuditTrailItem[];
}

export function AuditTrailCard({ items }: AuditTrailCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[#E2E8F0] py-6 px-4">
            <h2 className="text-[18px] font-semibold text-[#021310] mb-4">
                Audit Trail
            </h2>

            <div className="relative pl-4 space-y-6 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E2E8F0]">
                {items.map((item) => (
                    <div key={item.id} className="relative pl-3">
                        <div
                            className={`absolute -left-[15px] top-1.5 w-2.5 h-2.5 rounded-full ${item.color === "blue"
                                ? "bg-[#3B82F6]"
                                : item.color === "red"
                                    ? "bg-[#DC2626]"
                                    : "bg-[#16A34A]"
                                }`}
                        />
                        <h4 className="text-[16px] text-[#1F1F1F]" style={{ ...TYPOGRAPHY.body, fontWeight: 400 }}>
                            {item.event}
                        </h4>
                        <p className="text-[14px] text-[#858585] mt-0.5">{item.details}</p>
                        <p className="text-[12px] text-[#858585] mt-0.5">{item.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}