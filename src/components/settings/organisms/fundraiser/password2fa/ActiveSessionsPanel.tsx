'use client';

import React from 'react';
import { Smartphone } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';

const SESSIONS_MOCK = [
    { id: '1', device: 'MacBook Pro – Lagos, NG', details: 'Chrome – Active now' },
    { id: '2', device: 'MacBook Pro – Lagos, NG', details: 'Chrome – Active now' },
];

export function ActiveSessionsPanel() {
    return (
        <div className="bg-white border border-[#F4F5F7] rounded-md p-5 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.heading, fontWeight: 600 }}>
                    Active Sessions
                </h3>
                <button
                    type="button"
                    className="text-[14px] font-bold text-[#D4001A] hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4001A] focus:ring-offset-2 rounded"
                    aria-label="Log out of all active sessions"
                >
                    Log Out All
                </button>
            </div>

            <div className="space-y-3">
                {SESSIONS_MOCK.map((session) => (
                    <div key={session.id} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-[#F9FAFB] rounded-md shrink-0">
                                <Smartphone className="w-5 h-5 text-[#858585]" />
                            </div>
                            <div className='space-y-2'>
                                <h4 className="text-[16px] font-medium text-[#505050]">
                                    {session.device}
                                </h4>
                                <p className="text-[14px] text-[#858585]">
                                    {session.details}
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            className="text-[12px] font-bold text-[#858585] underline hover:text-[#1B1B1B] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#858585] focus:ring-offset-2 rounded"
                            aria-label={`Revoke session for ${session.device}`}
                        >
                            Revoke
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}