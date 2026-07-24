'use client';

import React, { useEffect } from 'react';
import { Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { TYPOGRAPHY } from '@/constants/styles';
import { Switch } from '@/components/ui/switch';
import { GlobalSettingsCard } from '@/components/settings/molecules/GlobalSettingsCard';
import {
  useFundraiserNotificationPreferences,
  useUpdateFundraiserNotificationPreferences,
} from '@/hooks/use-fundraiser-settings';
import { showApiErrorToast } from '@/lib/error-feedback';
import type { FundraiserNotificationPreferences } from '@/types/settings';

const IN_APP_PREFERENCE_SCHEMA = [
  {
    id: 'realTimeActivity' as const,
    title: 'Real-time Activity',
    description: 'Show popups for all platform activity.',
  },
  {
    id: 'chatMessages' as const,
    title: 'Chat Messages',
    description: 'Notify me when I receive a new message.',
  },
  {
    id: 'systemStatus' as const,
    title: 'System Status',
    description: 'Updates about platform maintenance and uptime.',
  },
];

export function InAppNotifications() {
  const { data: prefs, isLoading, isError, error } = useFundraiserNotificationPreferences();
  const updatePrefs = useUpdateFundraiserNotificationPreferences();

  useEffect(() => {
    if (isError) {
      showApiErrorToast(error, 'Unable to load in-app notification preferences.');
    }
  }, [isError, error]);

  const persist = (next: FundraiserNotificationPreferences) => {
    updatePrefs.mutate(next, {
      onError: (saveError) => {
        showApiErrorToast(saveError, 'Unable to update in-app notification preferences.');
      },
    });
  };

  const handleToggle = (
    id: (typeof IN_APP_PREFERENCE_SCHEMA)[number]['id'],
    checked: boolean,
  ) => {
    if (!prefs) return;
    persist({
      ...prefs,
      inApp: { ...prefs.inApp, [id]: checked },
    });
  };

  const handleGlobalMuteToggle = () => {
    if (!prefs) return;
    const muted = !prefs.inApp.muted;
    persist({
      ...prefs,
      inApp: { ...prefs.inApp, muted },
    });
    toast.success(muted ? 'In-app notifications muted' : 'In-app notifications unmuted');
  };

  if (isLoading) {
    return (
      <div className="w-full font-sans">
        <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
          Loading in-app notifications...
        </p>
      </div>
    );
  }

  if (!prefs) {
    return (
      <div className="w-full font-sans">
        <p className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
          Unable to load in-app notifications.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full font-sans space-y-6">
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
              checked={prefs.inApp[id]}
              disabled={updatePrefs.isPending || prefs.inApp.muted}
              onCheckedChange={(checked) => handleToggle(id, checked)}
              className="data-[state=checked]:bg-[#B9C65B]"
            />
          </div>
        ))}
      </div>

      <GlobalSettingsCard
        buttonLabel={prefs.inApp.muted ? 'Muted' : 'Enable mute'}
        onButtonClick={handleGlobalMuteToggle}
      />
    </div>
  );
}
