'use client'

import React, { useState } from 'react';
import { TYPOGRAPHY } from "@/constants/styles";
import {
    ChevronLeft,
    ChevronRight,
    AlertTriangle,
    Clock,
    Bell,
    Eye,
    Bookmark,
    ChevronDown,
    AlarmClock
} from "lucide-react";
import { InvestmentData } from '@/types/dashboard';
import { SetReminderModal } from '@/components/watchlist/SetReminderModal';
import { ReminderSuccessModal } from '@/components/watchlist/ReminderSuccessModal';
import { WatchlistEmptyState, WatchlistFilterType } from '@/components/watchlist/WatchlistEmptyState';

interface WatchlistTableProps {
    data: InvestmentData[];
    filterType?: WatchlistFilterType;
}

export function WatchlistTable({ data, filterType }: WatchlistTableProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<InvestmentData | null>(null);

    const isAllSelected = data.length > 0 && data.every(item => selectedIds.includes(item.id));

    const handleSelectAllToggle = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            const allIds = data.map(item => item.id);
            setSelectedIds(allIds);
        }
    };

    const handleSelectRow = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id)
                ? prev.filter(selectedId => selectedId !== id)
                : [...prev, id]
        );
    };

    const handleOpenReminder = (item: InvestmentData) => {
        setActiveItem(item);
        setIsFormOpen(true);
    };

    const handleFormSubmitSuccess = () => {
        setIsFormOpen(false);
        setIsSuccessOpen(true);
    };

    const handleCloseAllModals = () => {
        setIsFormOpen(false);
        setIsSuccessOpen(false);
        setActiveItem(null);
    };

    return (
        <div className="w-full bg-white border border-[#EAEAEA] rounded-xl p-6 shadow-sm">

            {/* Header and Controls Block */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-[18px] lg:text-[20px] font-semibold text-[#1A1C1E]" style={TYPOGRAPHY.heading}>My Watchlist</h3>
                    <p className="text-[14px] text-[#717171]" style={TYPOGRAPHY.body}>Keep track of projects you&apos;re interested in and manage them all in one place.</p>
                </div>

                {data.length > 0 && (
                    <div className="hidden lg:flex flex-wrap items-center gap-2 text-[14px]">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 cursor-pointer accent-[#042E27] h-4 w-4"
                                aria-label={isAllSelected ? "Checkbox: Unselect All" : "Checkbox: Select All"}
                                checked={isAllSelected}
                                onChange={handleSelectAllToggle}
                            />

                            <span className="text-[#1A1C1E] font-medium" style={TYPOGRAPHY.body}>
                                {isAllSelected ? "Unselect All" : "Select All"}
                            </span>
                        </label>
                    </div>
                )}
            </div>

            {data.length === 0 ? (
                <WatchlistEmptyState filterType={filterType ?? 'all'} />
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left table-fixed min-w-[1000px]">
                            <thead>
                                <tr className="border-b border-[#EAEAEA] text-[14px] text-[#1F1F1F]">
                                    <th className="pb-3 pl-2 w-10"></th>
                                    <th className="pb-3 font-normal w-1/5" style={TYPOGRAPHY.body}>Start up name</th>
                                    <th className="pb-3 font-normal w-8" style={TYPOGRAPHY.body}><ChevronDown /></th>
                                    <th className="pb-3 font-normal text-center w-32" style={TYPOGRAPHY.body}>Sector</th>
                                    <th className="pb-3 font-normal text-center w-32" style={TYPOGRAPHY.body}>Time Left</th>
                                    <th className="pb-3 font-normal text-center w-1/3" style={TYPOGRAPHY.body}>Recent Update</th>
                                    <th className="pb-3 font-normal text-center w-28" style={TYPOGRAPHY.body}>Reminders</th>
                                    <th className="pb-3 font-normal text-center w-28" style={TYPOGRAPHY.body}>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EAEAEA] text-[16px]">
                                {data.map((item) => {
                                    const isRowSelected = selectedIds.includes(item.id);
                                    const hasAlert = item.risk === "high"

                                    return (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                            {/* Checkbox column */}
                                            <td className="py-1 pl-2">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 cursor-pointer accent-[#042E27]"
                                                    aria-label={`Checkbox: ${item.name}`}
                                                    checked={isRowSelected}
                                                    onChange={() => handleSelectRow(item.id)}
                                                />
                                            </td>

                                            {/* Startup Name Details */}
                                            <td className="py-1">
                                                <p className="font-medium text-[#1F1F1F] text-[16px] truncate whitespace-nowrap" style={TYPOGRAPHY.body}>{item.name}</p>
                                                <p className="text-[12px] text-[#858585] mt-0.5" style={TYPOGRAPHY.body}>Added {item.watchlistAddedDate}</p>
                                            </td>

                                            {/* Alert */}
                                            <td className="py-1">
                                                <div className="flex items-center justify-center gap-2 text-[#1A1C1E] text-[14px]">
                                                    {hasAlert && <AlertTriangle className="w-4 h-4 text-[#F5A623]" />}
                                                </div>
                                            </td>

                                            {/* Sector Column */}
                                            <td className="py-1">
                                                <div className="flex items-center gap-2 text-[#1A1C1E] text-[14px]">
                                                    <p style={TYPOGRAPHY.body}>{item.sector}</p>
                                                </div>
                                            </td>

                                            {/* Time Left Column */}
                                            <td className="py-1">
                                                <div className="flex items-center gap-2 text-[#1A1C1E] text-[14px]">
                                                    <Clock className="w-4 h-4 text-[#1A1C1E]" />
                                                    <span style={TYPOGRAPHY.body}>{item.daysLeft} days</span>
                                                </div>
                                            </td>

                                            {/* Recent Update Column */}
                                            <td className="py-1 max-w-xs">
                                                <p className="text-[#1F1F1F] text-[16px] font-medium truncate" style={TYPOGRAPHY.body}>
                                                    {item.recentUpdate}
                                                </p>
                                                <p className="text-[12px] text-[#858585] mt-0.5" style={TYPOGRAPHY.body}>
                                                    {item.updateTimeAgo}
                                                </p>
                                            </td>

                                            {/* Reminders Column */}
                                            <td className="py-1 text-center">
                                                <div className="flex items-center justify-center gap-1 text-[#1A1C1E] text-[14px]">
                                                    <Bell className="w-4 h-4" />
                                                    <span style={TYPOGRAPHY.body}>{item.remindersCount}</span>
                                                </div>
                                            </td>

                                            {/* Actions UI Layout */}
                                            <td className="py-1">
                                                <div className="flex items-center justify-center gap-3 text-[#1A1C1E]">
                                                    <button
                                                        onClick={() => handleOpenReminder(item)}
                                                        className="hover:text-black transition-colors cursor-pointer"
                                                    >
                                                        <AlarmClock className="w-4 h-4" />
                                                    </button>
                                                    <button className="hover:text-black transition-colors cursor-pointer">
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="hover:text-black transition-colors cursor-pointer">
                                                        <Bookmark className="w-4 h-4 text-[#1A1C1E]" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls Footer - Only visible when dataset has records */}
                    <div className="flex items-center justify-end gap-2 mt-6">
                        <button className="p-2 border border-[#EAEAEA] rounded-lg hover:bg-gray-50 cursor-pointer">
                            <ChevronLeft className="w-4 h-4 text-[#505050]" />
                        </button>
                        <span className="px-4 py-1.5 border border-[#EAEAEA] bg-white rounded-lg text-[14px] font-medium text-[#1A1C1E]">1</span>
                        <button className="p-2 border border-[#EAEAEA] rounded-lg hover:bg-gray-50 cursor-pointer">
                            <ChevronRight className="w-4 h-4 text-[#505050]" />
                        </button>
                    </div>
                </>
            )}

            {/* Modals Containers */}
            <SetReminderModal
                isOpen={isFormOpen}
                onClose={handleCloseAllModals}
                onSuccess={handleFormSubmitSuccess}
                startupName={activeItem?.name || ''}
            />

            <ReminderSuccessModal
                isOpen={isSuccessOpen}
                onClose={handleCloseAllModals}
                startupName={activeItem?.name || ''}
            />
        </div>
    );
}