'use client';

import React, { useState } from 'react';
import { Smartphone, } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { Switch } from '@/components/ui/switch';
import { GlobalSettingsCard } from '@/components/settings//molecules/GlobalSettingsCard';


export interface NotificationPreferenceItem {
    id: string;
    title: string;
    description: string;
}

const IN_APP_PREFERENCE_SCHEMA: NotificationPreferenceItem[] = [
    {
        id: 'realTimeActivity',
        title: 'Real-time Activity',
        description: 'Show popups for all platform activity.',
    },
    {
        id: 'chatMessages',
        title: 'Chat Messages',
        description: 'Notify me when I receive a new message.',
    },
    {
        id: 'systemStatus',
        title: 'System Status',
        description: 'Updates about platform maintenance and uptime.',
    },
];

export function InAppNotifications() {

    const [preferences, setPreferences] = useState<Record<string, boolean>>({
        realTimeActivity: true,
        chatMessages: true,
        systemStatus: true,
    });

    const [isGlobalMuted, setIsGlobalMuted] = useState(false);

    const handleToggle = (id: string, checked: boolean) => {
        setPreferences(prev => ({ ...prev, [id]: checked }));
    };

    const handleGlobalMuteToggle = () => {
        setIsGlobalMuted(prev => !prev);
        console.log(`Global mute toggled state: ${!isGlobalMuted}`);
    };

    return (
        <div className="w-full font-sans space-y-6">

            {/* Header Text Section Frame */}
            <div>
                <h2 className="text-[24px] lg:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                    In-app Notifications
                </h2>
                <p className="text-[14px] lg:text-[16px] text-[#505050] mt-0.5" style={TYPOGRAPHY.body}>
                    Configure how you receive updates for this category.
                </p>
            </div>


            <div className="bg-white border border-[#F4F5F7] rounded-xl p-4 space-y-3 ">
                {IN_APP_PREFERENCE_SCHEMA.map(({ id, title, description }) => (
                    <div key={id} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-4">

                            <div className="p-3 bg-[#F9FAFB] rounded-md shrink-0">
                                <Smartphone className="w-6 h-6 text-[#858585]" />
                            </div>

                            <div>
                                <h4 className="text-[16px] text-[#505050]" style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}>
                                    {title}
                                </h4>
                                <p className="text-[14px] text-[#858585] mt-0.5">
                                    {description}
                                </p>
                            </div>
                        </div>
                        <Switch
                            checked={preferences[id]}
                            onCheckedChange={(checked) => handleToggle(id, checked)}
                            className="data-[state=checked]:bg-[#B9C65B]"
                        />
                    </div>
                ))}
            </div>

            {/* Dark Bottom Row Component Block Card: Global Mute Banner */}
            <GlobalSettingsCard
                buttonLabel={isGlobalMuted ? 'Muted' : 'Enable mute'}
                onButtonClick={handleGlobalMuteToggle}
            />


        </div>
    );
}