'use client';

import React, { useState } from 'react';
import { Smartphone, Laptop, X, LockKeyhole, Target, MonitorSmartphone } from 'lucide-react';
import { toast } from 'sonner';
import { TYPOGRAPHY } from "@/constants/styles";
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';
import { useChangePassword } from '@/hooks/use-settings';
import { showApiErrorToast } from '@/lib/error-feedback';

interface DeviceItem {
    id: string;
    type: 'mobile' | 'desktop';
    name: string;
    lastUsed: string;
    location: string;
}

const COMING_SOON_FEATURES = true;

export function Security() {
    const changePassword = useChangePassword();

    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const [mfaActive] = useState(false);
    const [biometricActive] = useState(false);

    const [devices] = useState<DeviceItem[]>([
        { id: '1', type: 'mobile', name: 'iPhone 14 Pro', lastUsed: '12/15/2024', location: 'Lagos, Nigeria' },
        { id: '2', type: 'desktop', name: 'MacBook Pro', lastUsed: '12/14/2024', location: 'Lagos, Nigeria' }
    ]);

    const handlePasswordChange = (field: keyof typeof passwords, value: string) => {
        setPasswords(prev => ({ ...prev, [field]: value }));
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            toast.error('New password and confirmation do not match.');
            return;
        }
        if (passwords.new.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return;
        }

        changePassword.mutate(
            {
                currentPassword: passwords.current,
                newPassword: passwords.new,
                confirmPassword: passwords.confirm,
            },
            {
                onSuccess: () => {
                    toast.success('Password updated');
                    setPasswords({ current: '', new: '', confirm: '' });
                },
                onError: (error) => {
                    showApiErrorToast(error, 'Unable to update password.');
                },
            }
        );
    };

    const isPasswordMismatch = passwords.confirm.length > 0 && passwords.new !== passwords.confirm;
    const isSubmitDisabled =
        changePassword.isPending
        || isPasswordMismatch
        || !passwords.current
        || !passwords.new
        || !passwords.confirm;

    return (
        <div className="w-full">

            <div className="flex items-center gap-2 pb-1">
                <LockKeyhole className="w-4 h-4 text-[#1A1A1A]" />
                <h2 className="text-[16px] lg:text-[20px] text-[#1F1F1F] font-medium" style={TYPOGRAPHY.body}>
                    Password Security
                </h2>
            </div>
            <p className="text-[14px] lg:text-[16px] text-[#858585] mb-6" style={TYPOGRAPHY.body}>
                Manage your password and login security
            </p>

            <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-full">

                <OnboardingInput
                    label="Current Password"
                    placeholder="Enter current password"
                    type='password'
                    value={passwords.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                    inputAreaStyle="bg-[#FFFFFF] text-[16px] text-[#858585] pr-10"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 items-start">

                    <OnboardingInput
                        label="New Password"
                        placeholder="Enter new password"
                        type='password'
                        value={passwords.new}
                        onChange={(e) => handlePasswordChange('new', e.target.value)}
                        inputAreaStyle="bg-[#FFFFFF] text-[16px] text-[#858585] pr-10"
                    />

                    <div>
                        <OnboardingInput
                            label="Confirm new password"
                            placeholder="Confirm new password"
                            type='password'
                            value={passwords.confirm}
                            onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                            inputAreaStyle="bg-[#FFFFFF] text-[16px] text-[#858585] pr-10"
                        />

                        {isPasswordMismatch && (
                            <span className="text-[#EF4444] text-[12px]" style={TYPOGRAPHY.body}>
                                Passwords do not match
                            </span>
                        )}
                    </div>

                </div>

                <div className="w-full flex justify-end">
                    <OnboardingButton
                        label="Update Password"
                        type="submit"
                        loading={changePassword.isPending}
                        disabled={isSubmitDisabled}
                        className="bg-[#042E27] hover:bg-[#03241F] text-white max-w-[160px] rounded-lg text-[14px] font-medium"
                    />
                </div>
            </form>

            <div className="flex items-center gap-2 mt-8 pb-1 pt-6 border-t border-[#F4F5F7]">
                <LockKeyhole className="w-4 h-4 text-[#1A1A1A]" />
                <h2 className="text-[16px] lg:text-[20px] text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                    Multi-Factor Authentication
                </h2>
            </div>
            <p className="text-[14px] lg:text-[16px] text-[#858585] mb-6" style={TYPOGRAPHY.body}>
                Add an extra layer of security to your account. Coming soon.
            </p>

            <div className="flex flex-col gap-4 opacity-60">
                <div className="flex items-center justify-between p-4 bg-white border border-[#EAEAEA] rounded-xl gap-4">
                    <div className="flex flex-col gap-0.5">
                        <h4 className="text-[14px] lg:text-[18px] font-medium text-[#1F1F1F]" style={TYPOGRAPHY.body}>MFA Status</h4>
                        <p className="text-[12px] lg:text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
                            {mfaActive ? "Enabled" : "Disabled"}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {mfaActive && (
                            <div className='flex justify-center items-center gap-1 py-1 px-2 rounded-sm bg-[#45B424]'>
                                <Target className='w-4 h-4 text-white' aria-hidden="true" />
                                <p className="text-[14px] text-white" >
                                    Active
                                </p>
                            </div>
                        )}
                        <button
                            type="button"
                            role="switch"
                            aria-checked={mfaActive}
                            aria-label="Toggle multi-factor authentication"
                            disabled={COMING_SOON_FEATURES}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-not-allowed rounded-full border-2 border-transparent transition-colors duration-200 ${mfaActive ? 'bg-[#042E27]' : 'bg-[#E4E4E7]'}`}
                        >
                            <span aria-hidden="true" className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${mfaActive ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white border border-[#EAEAEA] rounded-xl gap-4">
                    <div className="flex flex-col gap-0.5">
                        <h4 className="text-[14px] lg:text-[18px] font-medium text-[#1F1F1F]" style={TYPOGRAPHY.body}>Biometric Login</h4>
                        <p className="text-[12px] lg:text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>Use fingerprint or face recognition</p>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={biometricActive}
                        aria-label="Toggle biometric login"
                        disabled={COMING_SOON_FEATURES}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-not-allowed rounded-full border-2 border-transparent transition-colors duration-200 ${biometricActive ? 'bg-[#042E27]' : 'bg-[#E4E4E7]'}`}
                    >
                        <span aria-hidden="true" className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${biometricActive ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-8 pb-1 pt-6">
                <MonitorSmartphone className="w-5 h-5 text-[#1F1F1F]" />
                <h2 className="text-[16px] lg:text-[20px] text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                    Trusted Devices
                </h2>
            </div>
            <p className="text-[14px] lg:text-[16px] text-[#858585] mb-6" style={TYPOGRAPHY.body}>
                Manage devices that can access your account. Coming soon.
            </p>

            <div className="flex flex-col gap-3 opacity-60">
                {devices.map((device) => (
                    <div
                        key={device.id}
                        className="flex items-center justify-between p-4 bg-white border border-[#EAEAEA] rounded-xl gap-4 transition-all hover:border-gray-300"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg text-[#1A1A1A] shrink-0">
                                {device.type === 'mobile' ? <Smartphone size={20} /> : <Laptop size={20} />}
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h4 className="text-[18px] font-medium text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                                    {device.name}
                                </h4>
                                <p className="text-[12px] lg:text-[16px] text-[#858585]" style={TYPOGRAPHY.body}>
                                    Last used: {device.lastUsed} • {device.location}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            disabled={COMING_SOON_FEATURES}
                            className="p-1.5 text-gray-400 rounded-md cursor-not-allowed"
                            title="Revoke device access authorization credentials"
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}
