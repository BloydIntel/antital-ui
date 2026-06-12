'use client';

import React, { useState } from 'react';
import { CreditCard, Trash2 } from 'lucide-react';
import { TYPOGRAPHY } from "@/constants/styles";
import { cn } from '@/lib/utils';
import { SelectInput, type SelectOption } from '@/components/onboarding/molecules/SelectInput';

export interface GeneralPreferencesData {
    language: string;
    timeZone: string;
    currency: string;
    theme: string;
    marketingCommunications: boolean;
    dataProcessing: boolean;
}

interface PreferencesProps {
    initialSettings?: GeneralPreferencesData;
    onSaveSettings?: (settings: GeneralPreferencesData) => void;
    onDeleteAccount?: () => void;
}

// ==================== DROPDOWN OPTIONS CONFIGURATIONS ====================
const LANGUAGE_OPTIONS: readonly SelectOption[] = [
    { label: "English", value: "English" },
    { label: "French", value: "French" },
    { label: "Spanish", value: "Spanish" },
    { label: "German", value: "German" }
];

const TIMEZONE_OPTIONS: readonly SelectOption[] = [
    { label: "West African Time (WAT)", value: "West African Time (WAT)" },
    { label: "Coordinated Universal Time (UTC)", value: "Coordinated Universal Time (UTC)" },
    { label: "Greenwich Mean Time (GMT)", value: "Greenwich Mean Time (GMT)" }
];

const CURRENCY_OPTIONS: readonly SelectOption[] = [
    { label: "Nigerian Naira (₦)", value: "Nigerian Naira (₦)" },
    { label: "US Dollar ($)", value: "US Dollar ($)" },
    { label: "Euro (€)", value: "Euro (€)" },
    { label: "British Pound (£)", value: "British Pound (£)" }
];

const THEME_OPTIONS: readonly SelectOption[] = [
    { label: "Light", value: "Light" },
    { label: "Dark", value: "Dark" },
    { label: "System", value: "System" }
];

const defaultPreferences: GeneralPreferencesData = {
    language: "English",
    timeZone: "West African Time (WAT)",
    currency: "Nigerian Naira (₦)",
    theme: "Light",
    marketingCommunications: true,
    dataProcessing: true
};

export function Preferences({
    initialSettings = defaultPreferences,
    onSaveSettings,
    onDeleteAccount
}: PreferencesProps) {
    const [settings, setSettings] = useState<GeneralPreferencesData>(initialSettings);

    // Form Change Handlers
    const handleSelectChange = (key: keyof GeneralPreferencesData, value: string | boolean) => {
        const updated = { ...settings, [key]: value };
        setSettings(updated);
        if (onSaveSettings) onSaveSettings(updated);
    };

    const toggleState = (key: 'marketingCommunications' | 'dataProcessing') => {
        handleSelectChange(key, !settings[key]);
    };

    return (
        <div className="w-full">

            {/* ==================== SECTION 1: HEADER TITLE ==================== */}
            <div className="flex items-center gap-2 pb-1">
                <CreditCard className="w-4 h-4 text-[#1F1F1F]" />
                <h2 className="text-[16px] lg:text-[20px] text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                    General Preferences
                </h2>
            </div>
            <p className="text-[14px] lg:text-[16px] text-[#858585] mb-8" style={TYPOGRAPHY.body}>
                Customize your platform experience
            </p>

            {/* ==================== SECTION 2: SELECTION DROPDOWNS MATRIX ==================== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mb-8">

                {/* Language Selection Dropdown */}
                <SelectInput
                    label="Language"
                    options={LANGUAGE_OPTIONS}
                    value={settings.language}
                    onChange={(val) => handleSelectChange('language', val)}
                    selectAreaStyle="bg-white border-[#EAEAEA]"
                />

                {/* Time Zone Selection Dropdown */}
                <SelectInput
                    label="Time Zone"
                    options={TIMEZONE_OPTIONS}
                    value={settings.timeZone}
                    onChange={(val) => handleSelectChange('timeZone', val)}
                    selectAreaStyle="bg-white border-[#EAEAEA]"
                />

                {/* Currency Selection Dropdown */}
                <SelectInput
                    label="Currency"
                    options={CURRENCY_OPTIONS}
                    value={settings.currency}
                    onChange={(val) => handleSelectChange('currency', val)}
                    selectAreaStyle="bg-white border-[#EAEAEA]"
                />

                {/* Theme Selection Dropdown */}
                <SelectInput
                    label="Theme"
                    options={THEME_OPTIONS}
                    value={settings.theme}
                    onChange={(val) => handleSelectChange('theme', val)}
                    selectAreaStyle="bg-white border-[#EAEAEA]"
                />
            </div>

            {/* ==================== SECTION 3: PRIVACY & COMMUNICATIONS TOGGLES ==================== */}
            <div className="space-y-4 mb-12">

                {/* Marketing Communications Toggle Wrapper */}
                <div className="flex items-center justify-between p-4 border border-[#F4F5F7] rounded-xl bg-white">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[18px] text-[#1A1A1A] font-medium" style={TYPOGRAPHY.body}>
                            Marketing Communications
                        </span>
                        <span className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
                            Receive product updates and offers
                        </span>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={settings.marketingCommunications}
                        onClick={() => toggleState('marketingCommunications')}
                        className={cn(
                            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                            settings.marketingCommunications ? "bg-[#042E27]" : "bg-[#E4E4E7]"
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={cn(
                                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                settings.marketingCommunications ? "translate-x-5" : "translate-x-0"
                            )}
                        />
                    </button>
                </div>

                {/* Data Processing Toggle Wrapper */}
                <div className="flex items-center justify-between p-4 border border-[#F4F5F7] rounded-xl bg-white">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[18px] text-[#1A1A1A] font-medium" style={TYPOGRAPHY.body}>
                            Data Processing
                        </span>
                        <span className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
                            Allow processing for service improvement
                        </span>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={settings.dataProcessing}
                        onClick={() => toggleState('dataProcessing')}
                        className={cn(
                            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                            settings.dataProcessing ? "bg-[#042E27]" : "bg-[#E4E4E7]"
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={cn(
                                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                                settings.dataProcessing ? "translate-x-5" : "translate-x-0"
                            )}
                        />
                    </button>
                </div>
            </div>

            {/* ==================== SECTION 4: DANGER ZONE ==================== */}
            <div className="rounded-xl border border-rose-100 bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[18px] text-[#1A1A1A] font-medium" style={TYPOGRAPHY.body}>
                        Danger Zone
                    </span>
                    <span className="text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
                        These actions cannot be undone. Please proceed with caution.
                    </span>
                </div>
                <button
                    type="button"
                    onClick={onDeleteAccount}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 h-[40px] bg-[#D30A1A] text-white text-[14px] font-semibold rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                    style={TYPOGRAPHY.body}
                >
                    <Trash2 size={16} />
                    <span>Delete Account</span>
                </button>
            </div>

        </div>
    );
}