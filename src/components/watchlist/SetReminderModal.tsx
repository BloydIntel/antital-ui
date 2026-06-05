'use client'

import React, { useState } from 'react';
import { AlarmClock } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"; // Adjust this path based on where your Radix wrappers live
import { OnboardingButton } from '../onboarding/molecules/OnboardingButton';
import { TYPOGRAPHY } from '@/constants/styles';

interface SetReminderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    startupName: string;
}

export function SetReminderModal({ isOpen, onClose, onSuccess, startupName }: SetReminderModalProps) {
    const [reminderType, setReminderType] = useState('Deadline Reminder');
    const [timeBefore, setTimeBefore] = useState('3');
    const [unit, setUnit] = useState('Days');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSuccess();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-[460px] bg-white rounded-2xl p-6 shadow-xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
                <form onSubmit={handleSubmit} className="space-y-3">

                    {/* Modal Header */}
                    <div className="items-center gap-2.5">
                        <div className="flex gap-2 rounded-lg text-[#042E27]">
                            <AlarmClock className="w-5 h-5" />
                            <h4 className="text-[16px] font-medium text-[#1F1F1F]">Set Investment Reminder</h4>
                        </div>
                        <div>
                            <p className="text-[16px] text-[#858585] mt-0.5">Get notified about {startupName}</p>
                        </div>
                    </div>

                    {/* Input Controls Fields */}
                    <div
                        className="space-y-4"
                        style={TYPOGRAPHY.body}
                    >
                        {/* Reminder Type Select Row */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-medium text-[#1A1C1E]">Reminder Type</label>
                            <Select value={reminderType} onValueChange={setReminderType}>
                                <SelectTrigger
                                    className="w-full bg-[#F4F4F4] border-0 rounded-md px-4 py-5 text-[14px] text-[#505050] font-medium appearance-none outline-none focus:ring-2 focus:ring-[#042E27]/20 flex justify-between items-center shadow-none"
                                >
                                    <SelectValue placeholder="Select reminder type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border border-[#EAEAEA] rounded-md shadow-lg">
                                    <SelectItem value="Deadline Reminder" className="text-[14px] font-medium text-[#505050] focus:bg-[#042E27]/5 focus:text-[#042E27] cursor-pointer py-2 px-3 rounded-lg">
                                        Deadline Reminder
                                    </SelectItem>
                                    <SelectItem value="Funding Target" className="text-[14px] font-medium text-[#505050] focus:bg-[#042E27]/5 focus:text-[#042E27] cursor-pointer py-2 px-3 rounded-lg">
                                        Funding Target
                                    </SelectItem>
                                    <SelectItem value="Custom Date" className="text-[14px] font-medium text-[#505050] focus:bg-[#042E27]/5 focus:text-[#042E27] cursor-pointer py-2 px-3 rounded-lg">
                                        Custom Date
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Timing Variables Split Layout */}
                        <div className="grid lg:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-medium text-[#1A1C1E]">Time Before</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={timeBefore}
                                    onChange={(e) => setTimeBefore(e.target.value)}
                                    className="w-full bg-[#F4F4F4] border-0 rounded-md px-4 py-3 text-[14px] text-[#1A1C1E] font-medium outline-none focus:ring-2 focus:ring-[#042E27]/20"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-medium text-[#1A1C1E]">Unit</label>
                                <Select value={unit} onValueChange={setUnit}>
                                    <SelectTrigger className="w-full bg-[#F4F4F4] border-0 rounded-md px-4 py-5 text-[14px] text-[#505050] font-medium appearance-none outline-none focus:ring-2 focus:ring-[#042E27]/20 flex justify-between items-center shadow-none">
                                        <SelectValue placeholder="Select unit" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border border-[#EAEAEA] rounded-md shadow-lg">
                                        <SelectItem value="Days" className="text-[14px] font-medium text-[#505050] focus:bg-[#042E27]/5 focus:text-[#042E27] cursor-pointer py-2 px-3 rounded-lg">
                                            Days
                                        </SelectItem>
                                        <SelectItem value="Weeks" className="text-[14px] font-medium text-[#505050] focus:bg-[#042E27]/5 focus:text-[#042E27] cursor-pointer py-2 px-3 rounded-lg">
                                            Weeks
                                        </SelectItem>
                                        <SelectItem value="Hours" className="text-[14px] font-medium text-[#505050] focus:bg-[#042E27]/5 focus:text-[#042E27] cursor-pointer py-2 px-3 rounded-lg">
                                            Hours
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Preview Box Banner */}
                    <div className="bg-[#EDEDED] rounded-md p-4 text-[13px] text-[#4A4A4A] leading-relaxed">
                        <strong className="text-[#1A1C1E] font-semibold">Preview:</strong> You’ll be notified {timeBefore} {unit.toLowerCase()} before the funding deadline and kept updated on important changes.
                    </div>

                    {/* Footer Actions Button Controls */}
                    <div className="grid grid-cols-2 gap-3" >
                        <OnboardingButton
                            variant='plain'
                            onClick={onClose}
                            label='Cancel'
                            className='mt-1'
                            fontFamily='var(--font-clash-grotesk)'

                        />
                        <OnboardingButton
                            type='submit'
                            label='Set Reminder'
                            className='mt-1'
                            fontFamily='var(--font-clash-grotesk)'
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}