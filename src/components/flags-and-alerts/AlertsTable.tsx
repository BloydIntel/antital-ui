import { AlertItem } from "@/types/flags-and-alerts";
import { SeverityBadge } from "./SeverityBadge";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { TYPOGRAPHY } from "@/constants/styles";

interface AlertsTableProps {
    alerts: AlertItem[];
    onInvestigate: (alert: AlertItem) => void;
    onLoadMore?: () => void;
}

export function AlertsTable({ alerts, onInvestigate, onLoadMore }: AlertsTableProps) {
    return (
        <div className="bg-white rounded-b-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto w-full scrollbar-hide">
                <table className="w-full min-w-[850px] text-left text-sm border-collapse">
                    <thead className="bg-[#FFFFFF] border-b border-gray-100" style={TYPOGRAPHY.body}>
                        <tr className="text-[#64748B] text-[12px]">
                            <th className="py-3 px-6 font-normal whitespace-nowrap">Flag ID & Time</th>
                            <th className="py-3 px-6 font-normal whitespace-nowrap">Type & Severity</th>
                            <th className="py-3 px-6 font-normal whitespace-nowrap">Entity Affected</th>
                            <th className="py-3 px-6 font-normal whitespace-nowrap">Description</th>
                            <th className="py-3 px-6 font-normal whitespace-nowrap text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                        {alerts.map((alert) => (
                            <tr key={alert.id} className="hover:bg-gray-50/50 transition-colors">
                                {/* Flag ID & Time */}
                                <td className="py-1 px-6 whitespace-nowrap">
                                    <div className="text-[12px] text-[#2C2C2C]">{alert.flagId}</div>
                                    <div className="text-xs text-[#A8A8A8]">{alert.timeAgo}</div>
                                </td>

                                {/* Type & Severity */}
                                <td className="py-1 px-6 whitespace-nowrap">
                                    <div className="text-[14px] text-[#1F1F1F] mb-1">{alert.type}</div>
                                    <SeverityBadge severity={alert.severity} />
                                </td>

                                {/* Entity Affected */}
                                <td className="py-1 px-6 text-[12px] text-[#1F1F1F] whitespace-nowrap">
                                    {alert.entityAffected}
                                </td>

                                {/* Description */}
                                <td className="py-1 px-6 text-[14px] text-[#858585] max-w-sm whitespace-nowrap">
                                    {alert.description}
                                </td>

                                {/* Action */}
                                <td className="py-3 px-6 whitespace-nowrap">
                                    <div className="flex justify-end">
                                        <OnboardingButton
                                            variant="plain"
                                            type="button"
                                            label="Investigate"
                                            onClick={() => onInvestigate(alert)}
                                            className="w-fit my-0"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Load More Footer */}
            {onLoadMore && (
                <div className="py-3 text-center border-t border-gray-100 bg-white">
                    <button
                        onClick={onLoadMore}
                        className="text-sm text-[#A7B832] hover:underline transition-all cursor-pointer"
                    >
                        Load More Alerts
                    </button>
                </div>
            )}
        </div>
    );
}