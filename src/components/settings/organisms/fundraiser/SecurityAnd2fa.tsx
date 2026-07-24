'use client';

import React, { useEffect } from 'react';
import { Lock, Smartphone, Key, AlertTriangle, Shield } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { SecurityRowItem } from '@/components/settings/organisms/fundraiser/password2fa/SecurityRowItem';
import { ActiveSessionsPanel } from '@/components/settings/organisms/fundraiser/password2fa/ActiveSessionsPanel';
import { LoginHistoryPanel } from '@/components/settings/organisms/fundraiser/password2fa/LoginHistoryPanel';


interface SecurityAnd2faProps {
    targetSection?: 'password-2fa' | 'authorized-devices' | 'login-history' | string;
}

export function SecurityAnd2fa({ targetSection }: SecurityAnd2faProps) {

    useEffect(() => {

        if (!targetSection || targetSection === 'password-2fa') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const element = document.getElementById(targetSection);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [targetSection]);

    return (
        <div className="w-full font-sans space-y-6">

            {/* Security Center Header Banner */}
            <div className="relative overflow-hidden bg-[#021310] text-white rounded-md p-6 md:p-8.5 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="max-w-2xl z-10">
                    <h2 className="text-[24px] md:text-[28px] text-[#F4F5F7]" style={TYPOGRAPHY.heading}>
                        Security Center
                    </h2>
                    <p className="text-[14px] text-[#858585] mt-2 leading-relaxed" style={TYPOGRAPHY.body}>
                        Keep your account secure by enabling two-factor authentication and monitoring your login activity. We recommend using a hardware key for maximum security.
                    </p>
                </div>

                {/* Score Widget */}
                <div className="relative z-10 bg-white/8 border border-white/10 rounded-xl p-4 min-w-[160px] text-center shrink-0">
                    <span className="block text-[14px] text-[#B9C65B] font-medium">Security Score</span>
                    <div className="text-[24px] text-[#F4F5F7] my-0.5" style={TYPOGRAPHY.heading}>
                        82<span className="text-[19px] text-[#A8A8A8]" style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}>/100</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-[12px] text-[#DCA73B]">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Action required</span>
                    </div>
                </div>

                {/* Background Emblem Graphic */}
                <div className="hidden absolute -right-18.5 -top-18 bottom-0 opacity-10 pointer-events-none lg:flex items-center pr-10">

                    <Shield className="w-64 h-64 text-white" strokeWidth={1.3} />
                </div>
            </div>

            {/* Main Security Actions Panel */}
            <div className="bg-white border border-[#F4F5F7] rounded-md p-6">
                <SecurityRowItem
                    icon={Lock}
                    title="Account Password"
                    description="Last change 3 months ago. We recommend changing it every 6 months."
                    buttonLabel="Change Password"
                    onActionClick={() => console.log('Change Password Triggered')}
                />

                <SecurityRowItem
                    icon={Smartphone}
                    title="Two-Factor Authentication"
                    badge={{ label: 'DISABLED', variant: 'disabled' }}
                    description="Add an extra layer of security to your account using an authenticator app."
                    buttonLabel="Setup 2FA"
                    onActionClick={() => console.log('Setup 2FA Triggered')}
                />

                <SecurityRowItem
                    icon={Key}
                    title="Hardware Security Keys"
                    badge={{ label: 'ENABLE', variant: 'enable' }}
                    description="Use Physical Keys like Yubikey for the highest level of account protection."
                    buttonLabel="Manage Keys"
                    onActionClick={() => console.log('Manage Keys Triggered')}
                />
            </div>

            {/* Bottom Row Grid: Active Sessions & Login History */}
            <div className="grid md:grid-cols-2 gap-6">
                <div id="authorized-devices" className="scroll-mt-6">
                    <ActiveSessionsPanel />
                </div>


                <div id="login-history" className="scroll-mt-6">
                    <LoginHistoryPanel />
                </div>
            </div>

        </div>
    );
}