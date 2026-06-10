'use client';

import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { TYPOGRAPHY } from "@/constants/styles";
import { useNotificationStore, NotificationSettings } from '@/store/notificationStore';

interface NotificationItemProps {
    title: string;
    description: string;
    checked: boolean;
    onToggle: () => void;
}

// Reusable custom card switch item component
function NotificationRow({ title, description, checked, onToggle }: NotificationItemProps) {
    return (
        <div className="flex items-start justify-between p-4 md:p-5 bg-white rounded-xl gap-6 transition-all hover:border-gray-300">
            <div className="flex flex-col gap-1">
                <h4 className="text-[18px] font-medium text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                    {title}
                </h4>
                <p className="text-[16px] text-[#505050] max-w-[950px]" style={TYPOGRAPHY.body}>
                    {description}
                </p>
            </div>

            {/* Fine-Tuned Toggle Switch */}
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={onToggle}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-[#042E27]' : 'bg-[#E4E4E7]'
                    }`}
            >
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </button>
        </div>
    );
}

export function Notification() {
    const store = useNotificationStore();
    const [localSettings, setLocalSettings] = useState<NotificationSettings | null>(null);

    // Sync client state safely after hydration
    useEffect(() => {
        setLocalSettings(store.settings);
    }, [store.settings]);

    if (!localSettings) {
        return <div className="w-full h-48 animate-pulse bg-gray-50 rounded-xl" />;
    }

    const notificationItems = [
        {
            id: 'email' as const,
            title: 'Email',
            description: 'Control your inbox experience by selecting which investment alerts, reminders, and updates you’d like delivered by email, and how often you’d like to receive them.',
        },
        {
            id: 'newListings' as const,
            title: 'New Listings',
            description: 'Get notified about new investment opportunities.',
        },
        {
            id: 'watchlistDeadlines' as const,
            title: 'Watchlist Deadlines',
            description: 'Alerts for projects in your watchlist.',
        },
        {
            id: 'investmentReminders' as const,
            title: 'Investment Reminders',
            description: 'Reminders about your investment activities.',
        },
        {
            id: 'activityFeeds' as const,
            title: 'Activity Feeds',
            description: 'Updates on platform activity.',
        },
        {
            id: 'portfolioUpdates' as const,
            title: 'Portfolio Updates',
            description: 'Changes to your portfolio performance.',
        },
    ];

    return (
        <div className="w-full mx-auto">
            {/* Header Block Section */}
            <div className="flex flex-col gap-1 pb-6 mb-6 border-b border-[#F4F5F7]">
                <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#1A1A1A]" />
                    <h2 className="text-[18px] lg:text-[20px] text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                        Notification Preferences
                    </h2>
                </div>
                <p className="text-[14px] lg:text-[16px] text-[#505050]" style={TYPOGRAPHY.body}>
                    Control how and when you receive notifications
                </p>
            </div>

            {/* Layout List Stack */}
            <div className="flex flex-col gap-4">
                {notificationItems.map((item) => (
                    <NotificationRow
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        checked={localSettings[item.id]}
                        onToggle={() => store.toggleSetting(item.id)}
                    />
                ))}
            </div>
        </div>
    );
}