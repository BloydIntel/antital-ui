'use client';

import React, { useState } from 'react';
import { Megaphone } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { Switch } from '@/components/ui/switch';
import { GlobalSettingsCard } from '@/components/settings/molecules/GlobalSettingsCard';

export interface NotificationPreferenceItem {
    id: string;
    title: string;
    description: string;
}

const MARKETING_PREFERENCE_SCHEMA: NotificationPreferenceItem[] = [
    {
        id: 'productNews',
        title: 'Product News',
        description: 'Stay updated with our latest features and improvements.',
    },
    {
        id: 'investorTips',
        title: 'Investor Tips',
        description: 'Weekly insight on how to attract more investors.',
    },
    {
        id: 'partner',
        title: 'Partner',
        description: 'Exclusive deals from our trusted partners.',
    },
];

export function MarketingPreferences() {
    const [preferences, setPreferences] = useState<Record<string, boolean>>({
        productNews: true,
        investorTips: true,
        partner: true,
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
                    Marketing Preferences
                </h2>
                <p className="text-[14px] lg:text-[16px] text-[#505050] mt-0.5" style={TYPOGRAPHY.body}>
                    Configure how you receive updates for this category.
                </p>
            </div>

            <div className="bg-white border border-[#F4F5F7] rounded-xl p-4 space-y-3">
                {MARKETING_PREFERENCE_SCHEMA.map(({ id, title, description }) => (
                    <div key={id} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-4">

                            <div className="p-3 bg-[#F9FAFB] rounded-md shrink-0">
                                <Megaphone className="w-6 h-6 text-[#858585]" />
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