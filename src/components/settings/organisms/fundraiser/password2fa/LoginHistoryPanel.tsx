'use client';

import React from 'react';
import { History, ChevronRight } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';

const LOGIN_HISTORY_MOCK = [
    { id: '1', title: 'Successful Login', timestamp: 'Feb 12, 2026 – 10:42 AM', ip: '192.168.1.1' },
    { id: '2', title: 'Successful Login', timestamp: 'Feb 12, 2026 – 10:42 AM', ip: '192.168.1.1' },
    { id: '3', title: 'Successful Login', timestamp: 'Feb 12, 2026 – 10:42 AM', ip: '192.168.1.1' },
];

export function LoginHistoryPanel() {
    return (
        <div className="bg-white border border-[#F4F5F7] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.heading, fontWeight: 600 }}>
                    Login History
                </h3>
                <button
                    type="button"
                    className="flex items-center gap-1 text-[14px] font-bold text-[#B9C65B] hover:underline cursor-pointer"
                >
                    View All
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-3">
                {LOGIN_HISTORY_MOCK.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-[#F9FAFB] rounded-md shrink-0">
                                <History className="w-5 h-5 text-[#858585]" />
                            </div>
                            <div className='space-y-2'>
                                <h4 className="text-[16px] font-medium text-[#505050]">
                                    {item.title}
                                </h4>
                                <p className="text-[14px] text-[#858585]">
                                    {item.timestamp}
                                </p>
                            </div>
                        </div>
                        <span className="text-[12px] text-[#858585]">
                            {item.ip}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}