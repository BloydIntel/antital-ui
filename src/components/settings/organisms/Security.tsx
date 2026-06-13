'use client';

import React, { useState } from 'react';
import { Smartphone, Laptop, X, LockKeyhole, Target, MonitorSmartphone } from 'lucide-react';
import { TYPOGRAPHY } from "@/constants/styles";
import { OnboardingInput } from '@/components/onboarding/molecules/OnboardingInput';
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton';

interface DeviceItem {
    id: string;
    type: 'mobile' | 'desktop';
    name: string;
    lastUsed: string;
    location: string;
}

export function Security() {
    // Password state parameters
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    // Security Feature Toggles
    const [mfaActive, setMfaActive] = useState(true);
    const [biometricActive, setBiometricActive] = useState(true);

    // Trusted Devices List State Mock
    const [devices, setDevices] = useState<DeviceItem[]>([
        { id: '1', type: 'mobile', name: 'iPhone 14 Pro', lastUsed: '12/15/2024', location: 'Lagos, Nigeria' },
        { id: '2', type: 'desktop', name: 'MacBook Pro', lastUsed: '12/14/2024', location: 'Lagos, Nigeria' }
    ]);

    const handlePasswordChange = (field: keyof typeof passwords, value: string) => {
        setPasswords(prev => ({ ...prev, [field]: value }));
    };

    const handleRemoveDevice = (id: string) => {
        setDevices(prev => prev.filter(device => device.id !== id));
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) return;
        // TODO: Integrate with password update API
        setPasswords({ current: '', new: '', confirm: '' });
    };

    const isPasswordMismatch = passwords.confirm.length > 0 && passwords.new !== passwords.confirm;

    return (
        <div className="w-full">

            {/* ==================== SECTION 1: PASSWORD SECURITY ==================== */}
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
                        disabled={isPasswordMismatch || !passwords.current || !passwords.new}
                        className="bg-[#042E27] hover:bg-[#03241F] text-white max-w-[160px] rounded-lg text-[14px] font-medium"
                    />
                </div>
            </form>

            {/* ==================== SECTION 2: MULTI-FACTOR AUTHENTICATION ==================== */}
            <div className="flex items-center gap-2 mt-8 pb-1 pt-6 border-t border-[#F4F5F7]">
                <LockKeyhole className="w-4 h-4 text-[#1A1A1A]" />
                <h2 className="text-[16px] lg:text-[20px] text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                    Multi-Factor Authentication
                </h2>
            </div>
            <p className="text-[14px] lg:text-[16px] text-[#858585] mb-6" style={TYPOGRAPHY.body}>
                Add an extra layer of security to your account
            </p>

            <div className="flex flex-col gap-4">
                {/* MFA Status Component Row */}
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
                            onClick={() => setMfaActive(!mfaActive)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#042E27] focus-visible:ring-offset-2 ${mfaActive ? 'bg-[#042E27]' : 'bg-[#E4E4E7]'}`}
                        >
                            <span aria-hidden="true" className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${mfaActive ? 'translate-x-5' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>

                {/* Biometric Configuration Row */}
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
                        onClick={() => setBiometricActive(!biometricActive)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#042E27] focus-visible:ring-offset-2 ${biometricActive ? 'bg-[#042E27]' : 'bg-[#E4E4E7]'}`}
                    >
                        <span aria-hidden="true" className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ${biometricActive ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>

            {/* ==================== SECTION 3: TRUSTED DEVICES ==================== */}
            <div className="flex items-center gap-2 mt-8 pb-1 pt-6">
                <MonitorSmartphone className="w-5 h-5 text-[#1F1F1F]" />
                <h2 className="text-[16px] lg:text-[20px] text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                    Trusted Devices
                </h2>
            </div>
            <p className="text-[14px] lg:text-[16px] text-[#858585] mb-6" style={TYPOGRAPHY.body}>
                Manage devices that can access your account
            </p>

            <div className="flex flex-col gap-3">
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
                            onClick={() => handleRemoveDevice(device.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-md transition-colors cursor-pointer"
                            title="Revoke device access authorization credentials"
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
                {devices.length === 0 && (
                    <div className="text-center py-6 text-gray-400 text-[14px] bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        No custom active devices linked to authorization cache profile.
                    </div>
                )}
            </div>

        </div>
    );
}