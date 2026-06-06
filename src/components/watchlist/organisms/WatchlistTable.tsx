'use client'

import React, { useEffect, useState } from 'react';
import { TYPOGRAPHY } from "@/constants/styles";
import {
    AlertTriangle,
    Clock,
    Bell,
    Eye,
    Bookmark,
    AlarmClock
} from "lucide-react";
import { InvestmentData } from '@/types/dashboard';
import { SetReminderModal } from '@/components/watchlist/organisms/SetReminderModal';
import { ReminderSuccessModal } from '@/components/watchlist/organisms/ReminderSuccessModal';
import { WatchlistEmptyState, WatchlistFilterType } from '@/components/watchlist/organisms/WatchlistEmptyState';
import { TablePagination } from '@/components/watchlist/molecules/TablePagination';

interface WatchlistTableProps {
    data: InvestmentData[];
    filterType?: WatchlistFilterType;
    itemsPerPage?: number;
}

export function WatchlistTable({ data, filterType, itemsPerPage = 10 }: WatchlistTableProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [activeItem, setActiveItem] = useState<InvestmentData | null>(null);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    useEffect(() => {
        setCurrentPage(1);
    }, [data.length, filterType]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    const isAllSelected = paginatedData.length > 0 && paginatedData.every(item => selectedIds.includes(item.id));

    const handleSelectAllToggle = () => {
        if (isAllSelected) {
            const paginatedIds = paginatedData.map(item => item.id);
            setSelectedIds(prev => prev.filter(id => !paginatedIds.includes(id)));
        } else {
            const currentIds = paginatedData.map(item => item.id);
            setSelectedIds(prev => Array.from(new Set([...prev, ...currentIds])));
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
        <div>
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
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left table-fixed min-w-[1000px]">
                            <thead>
                                <tr className="border-b border-[#EAEAEA] text-[14px] text-[#1F1F1F]">
                                    <th className="pb-3 pl-2 w-10"></th>
                                    <th className="pb-3 font-normal w-1/5" style={TYPOGRAPHY.body}>Start up name</th>
                                    <th className="pb-3 font-normal w-8" style={TYPOGRAPHY.body}></th>
                                    <th className="pb-3 font-normal w-32" style={TYPOGRAPHY.body}>Sector</th>
                                    <th className="pb-3 font-normal w-32" style={TYPOGRAPHY.body}>Time Left</th>
                                    <th className="pb-3 font-normal w-1/3" style={TYPOGRAPHY.body}>Recent Update</th>
                                    <th className="pb-3 font-normal text-center w-28" style={TYPOGRAPHY.body}>Reminders</th>
                                    <th className="pb-3 font-normal text-center w-28" style={TYPOGRAPHY.body}>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EAEAEA] text-[16px]">
                                {paginatedData.map((item) => {
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
                                                {item.watchlistAddedDate && (
                                                    <p className="text-[12px] text-[#858585] mt-0.5" style={TYPOGRAPHY.body}>
                                                        Added {item.watchlistAddedDate}
                                                    </p>
                                                )}
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
                                                    {item.recentUpdate ?? 'No updates available'}
                                                </p>
                                                <p className="text-[12px] text-[#858585] mt-0.5" style={TYPOGRAPHY.body}>
                                                    {item.updateTimeAgo}
                                                </p>
                                            </td>

                                            {/* Reminders Column */}
                                            <td className="py-1 text-center">
                                                <div className="flex items-center justify-center gap-1 text-[#1A1C1E] text-[14px]">
                                                    <Bell className="w-4 h-4" />
                                                    <span style={TYPOGRAPHY.body}>{item.remindersCount ?? 0}</span>
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

            <div className="flex items-center justify-end mt-4">
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

        </div>
    );
}