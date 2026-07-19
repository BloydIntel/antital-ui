'use client';

import React, { useState } from 'react';
import { Mail, } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { Switch } from '@/components/ui/switch';
import { GlobalSettingsCard } from '@/components/settings//molecules/GlobalSettingsCard';

export interface AlertPreferenceItem {
    id: string;
    title: string;
    description: string;
}

const ALERT_PREFERENCE: AlertPreferenceItem[] = [
    {
        id: 'campaignUpdates',
        title: 'Campaign Updates',
        description: 'Get notified when a campaign reaches a milestone.',
    },
    {
        id: 'newInvestments',
        title: 'New Investments',
        description: 'Security Alerts',
    },
    {
        id: 'securityAlerts',
        title: 'Security Alerts',
        description: 'Security Alerts',
    },
];

export function EmailAlerts() {

    const [preferences, setPreferences] = useState<Record<string, boolean>>({
        campaignUpdates: true,
        newInvestments: true,
        securityAlerts: true,
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


            <div>
                <h2 className="text-[24px] lg:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                    Email Alerts
                </h2>
                <p className="text-[14px] lg:text-[16px] text-[#505050] mt-0.5" style={TYPOGRAPHY.body}>
                    Configure how you receive updates in your email
                </p>
            </div>

            <div className="bg-white border border-[#F4F5F7] rounded-xl p-4 space-y-3">
                {ALERT_PREFERENCE.map(({ id, title, description }) => (
                    <div key={id} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#F9FAFB] rounded-lg text-[#F9FAFB] shrink-0 mt-0.5">
                                <Mail className="w-5 h-5 text-[#1F1F1F]" />
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

            {/* Dark Bottom Row Component Block Card: Global Mute Panel Banner */}
            <GlobalSettingsCard
                buttonLabel={isGlobalMuted ? 'Muted' : 'Enable mute'}
                onButtonClick={handleGlobalMuteToggle}
            />

        </div>
    );
}