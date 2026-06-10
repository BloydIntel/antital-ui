import { TYPOGRAPHY } from '@/constants/styles'
import { cn } from '@/lib/utils';

const settingsTabs = [
    { id: "profile", label: "Profile" },
    { id: "notification", label: "Notification" },
    { id: "account", label: "Account" },
    { id: "payment", label: "Payment" },
    { id: "preferences", label: "Preferences" },
]


interface SettingsPillTabProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}
export function SettingsPillTab({ activeTab, onTabChange }: SettingsPillTabProps) {
    return (
        <div className="flex items-center bg-[#EAEAEA]/60 p-1.5 rounded-lg w-full md:w-max overflow-x-auto flex-nowrap gap-1 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {settingsTabs.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                        "px-3 py-1.5 text-[16px] rounded-md cursor-pointer transition-all whitespace-nowrap font-medium",
                        activeTab === tab.id
                            ? "bg-[#042E27] text-white shadow-sm"
                            : "text-[#505050] hover:text-black hover:bg-white/40"
                    )}
                    style={TYPOGRAPHY.body}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}
