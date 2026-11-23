'use client';

import { useState, useMemo, useEffect } from 'react';
import { Trash2, Settings, CheckCircle2, Filter, Clock3, ArrowUpRight, TrendingUp, Smartphone, Mail, Wallet, Bell } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { cn } from '@/lib/utils';
import { SearchInputBar } from '@/components/watchlist/organisms/SearchInputBar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import {
    useBulkDeleteNotifications,
    useDeleteNotification,
    useMarkAllNotificationsRead,
    useMarkNotificationRead,
    useNotifications,
} from "@/hooks/use-notifications";
import { toNotificationListItem } from "@/lib/notification-display";
import { getApiPrimaryMessage, isApiErrorStatus } from "@/lib/api-error";
import type { NotificationCategory, NotificationListItem } from "@/types/notifications-api";
import { toast } from "sonner";
import { TablePagination } from "@/components/watchlist/molecules/TablePagination";
import { NotificationCenterSkeleton } from "@/components/skeletons/notification-center-skeleton";

export type { NotificationCategory, NotificationListItem };
export type ReadFilterValue = "all" | "unread" | "read";

const PAGE_SIZE = 20;
const SEARCH_DEBOUNCE_MS = 350;

const CATEGORY_TAG_STYLING: Record<NotificationCategory, string> = {
    Urgent: "bg-[#D4001A] text-white text-[12px] px-2 py-0.5 rounded",
    Portfolio: "bg-[#7D8A26] text-white text-[12px] px-2 py-0.5 rounded",
    Market: "bg-[#D4001A] text-white text-[12px] px-2 py-0.5 rounded",
    Account: "bg-[#7A6FF0] text-white text-[12px] px-2 py-0.5 rounded",
    Marketing: "bg-[#D30A1A] text-white text-[12px] px-2 py-0.5 rounded",
    Finance: "bg-[#45B424] text-white text-[12px] px-2 py-0.5 rounded",
};

const CATEGORY_ICONS: Record<NotificationCategory, React.ComponentType<{ className?: string }>> = {
    Urgent: Clock3,
    Portfolio: ArrowUpRight,
    Market: TrendingUp,
    Account: Smartphone,
    Marketing: Mail,
    Finance: Wallet,
};

function isSafeRelativeRoute(url?: string): url is string {
    if (!url) return false;
    return url.startsWith("/") && !url.startsWith("//");
}

export function NotificationCenter() {
    const router = useRouter();

    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1);
        }, SEARCH_DEBOUNCE_MS);

        return () => window.clearTimeout(timer);
    }, [searchQuery]);

    const { data, isLoading, isError, error, refetch } = useNotifications({
        page,
        pageSize: PAGE_SIZE,
        category: categoryFilter === 'all' ? 'all' : (categoryFilter as NotificationCategory),
        search: debouncedSearch,
    });

    const markOneReadMutation = useMarkNotificationRead();
    const markAllReadMutation = useMarkAllNotificationsRead();
    const deleteOneMutation = useDeleteNotification();
    const bulkDeleteMutation = useBulkDeleteNotifications();

    const notifications: NotificationListItem[] = useMemo(() => {
        if (!data?.items) return [];
        return data.items.map(toNotificationListItem);
    }, [data?.items]);

    const unreadCount = data?.unreadCount ?? 0;
    const currentPage = data?.page ?? page;
    const totalPages = data?.totalPages ?? 1;

    useEffect(() => {
        setSelectedIds(new Set());
    }, [notifications]);

    const handleCategoryChange = (value: string) => {
        setCategoryFilter(value);
        setPage(1);
    };

    const handleMutationError = (err: unknown, fallbackMessage: string) => {
        if (isApiErrorStatus(err, 404)) {
            toast.error('This notification no longer exists or was already updated.');
            void refetch();
            return;
        }
        toast.error(getApiPrimaryMessage(err, fallbackMessage));
    };

    // Bulk action toggles
    const handleSelectAll = () => {
        if (selectedIds.size === notifications.length && notifications.length > 0) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(notifications.map(n => n.id)));
        }
    };

    const handleSelectRow = (id: string) => {
        const next = new Set(selectedIds);
        if (next.has(id)) {
            next.delete(id);
        } else {
            next.add(id);
        }
        setSelectedIds(next);
    };

    const handleMarkOneRead = async (id: string) => {
        const numericId = Number(id);
        if (Number.isNaN(numericId)) return;

        try {
            await markOneReadMutation.mutateAsync(numericId);
        } catch (err) {
            handleMutationError(err, 'Failed to mark notification as read');
        }
    };

    const handleDeleteSingle = async (id: string) => {
        const numericId = Number(id);
        if (Number.isNaN(numericId)) return;

        try {
            await deleteOneMutation.mutateAsync(numericId);
        } catch (err) {
            handleMutationError(err, 'Failed to delete notification');
        }
    };

    const handleMarkAllReadAction = async () => {
        try {
            await markAllReadMutation.mutateAsync();
        } catch (err) {
            handleMutationError(err, 'Failed to mark all notifications as read');
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.size === 0 || bulkDeleteMutation.isPending) return;

        const numericIds = Array.from(selectedIds)
            .map(id => Number(id))
            .filter(id => !Number.isNaN(id));

        if (numericIds.length === 0) return;

        try {
            await bulkDeleteMutation.mutateAsync(numericIds);
            setSelectedIds(new Set());
        } catch (err) {
            handleMutationError(err, 'Failed to delete selected notifications');
        }
    };

    const handleActionClick = (notification: NotificationListItem) => {
        if (isSafeRelativeRoute(notification.actionUrl)) {
            router.push(notification.actionUrl);
        }
    };

    const handleRowClick = (
        event: React.MouseEvent<HTMLDivElement>,
        item: NotificationListItem
    ) => {
        const target = event.target as HTMLElement;
        if (target.closest("[data-stop-row-click='true']")) {
            return;
        }

        const isMutating =
            markOneReadMutation.isPending ||
            markAllReadMutation.isPending ||
            deleteOneMutation.isPending ||
            bulkDeleteMutation.isPending;

        if (item.isUnread && !isMutating) {
            void handleMarkOneRead(item.id);
        }
    };

    return (
        <div className="w-full bg-[#FAFAFA] min-h-screen">
            {/* Top Toolbar Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-[24px] lg:text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                        Notification Center
                    </h1>
                    <p className="text-[14px] lg:text-[16px] text-[#505050]" style={TYPOGRAPHY.body}>
                        Stay informed about your investments and account activities
                    </p>
                </div>

                {/* Configuration Buttons Header */}
                <div className="hidden lg:flex items-center gap-3 w-full sm:w-auto">
                    <button
                        type="button"
                        onClick={() => router.push('/settings?tab=notification')}
                        className="flex items-center gap-2 px-4 py-2 border border-[#EAEAEA] bg-white rounded-lg text-[16px] text-[#1F1F1F] hover:bg-gray-50 transition-colors cursor-pointer"
                        style={TYPOGRAPHY.heading}
                    >
                        <Settings size={16} />
                        <span>Settings</span>
                    </button>
                    <button
                        type="button"
                        disabled={markAllReadMutation.isPending || isLoading || isError}
                        onClick={() => void handleMarkAllReadAction()}
                        className="flex items-center gap-2 px-4 py-2 border border-[#EAEAEA] bg-white rounded-lg text-[14px] text-[#1F1F1F] hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                        style={TYPOGRAPHY.heading}
                    >
                        <CheckCircle2 size={16} />
                        <span>Mark All Read</span>
                    </button>
                </div>
            </div>

            {/* Sub-counter and Utility Filter Action Bar */}
            <div className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-[16px] md:text-[20px] text-[#1F1F1F] mb-2" style={TYPOGRAPHY.body}>
                            Notifications ({unreadCount})
                        </h2>
                        <p className='text-[#505050] text-[16px]'>
                            All your unread updates and reminders are listed below
                        </p>
                    </div>

                    {/* Filter controls row */}
                    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                        <SearchInputBar
                            placeholder="Search"
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />

                        <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                            <SelectTrigger className="px-2.5 border-[#EAEAEA] bg-white rounded-md cursor-pointer text-[#2C2C2C] focus:ring-1 focus:ring-[#042E27]">
                                <div className="flex items-center gap-2 justify-between">
                                    <div className="flex items-center gap-1.5 truncate">
                                        <Filter className="h-4 w-4 text-[#2C2C2C] shrink-0" />
                                        <SelectValue placeholder="Filter" className="text-[16px]" style={TYPOGRAPHY.body} />
                                    </div>
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-[#EAEAEA] rounded-md shadow-lg">
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="Urgent">Urgent</SelectItem>
                                <SelectItem value="Portfolio">Portfolio</SelectItem>
                                <SelectItem value="Market">Market</SelectItem>
                                <SelectItem value="Account">Account</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                            </SelectContent>
                        </Select>

                        <label className="flex items-center gap-2 text-[16px] text-[#2C2C2C] cursor-pointer select-none ml-2">
                            <input
                                type="checkbox"
                                checked={selectedIds.size === notifications.length && notifications.length > 0}
                                onChange={handleSelectAll}
                                className="rounded border-gray-300 text-[#042E27] focus:ring-[#042E27] w-3 h-3"
                            />
                            <span>Select All</span>
                        </label>

                        {selectedIds.size > 0 && (
                            <button
                                type="button"
                                disabled={bulkDeleteMutation.isPending}
                                onClick={() => void handleBulkDelete()}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D30A1A] text-white text-[14px] rounded-md hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-50"
                                style={TYPOGRAPHY.body}
                            >
                                <Trash2 size={14} />
                                <span>Delete ({selectedIds.size})</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Notifications Feed Area */}
            <div className="space-y-3">
                {isLoading ? (
                    <NotificationCenterSkeleton rows={5} />
                ) : isError ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-[#F0F0F0] text-[#858585]" style={TYPOGRAPHY.body}>
                        <p className="mb-3">{error instanceof Error ? error.message : 'Unable to load notifications.'}</p>
                        <button
                            type="button"
                            onClick={() => void refetch()}
                            className="px-4 py-1.5 bg-[#042E27] text-white text-[13px] font-medium rounded-md hover:bg-[#03201B] transition-colors cursor-pointer"
                            style={TYPOGRAPHY.body}
                        >
                            Retry
                        </button>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-[#F0F0F0] text-[#858585]" style={TYPOGRAPHY.body}>
                        No notifications found.
                    </div>
                ) : (
                    notifications.map((item) => {
                        const CategoryIcon = CATEGORY_ICONS[item.category] || Bell;
                        return (
                            <div
                                key={item.id}
                                onClick={(e) => handleRowClick(e, item)}
                                className={cn(
                                    "flex items-center bg-white border rounded-xl p-4 transition-all relative group",
                                    item.isUnread ? "border-l-4 border-l-[#042E27]" : "border-[#F0F0F0]"
                                )}
                            >
                                {/* Checkbox selector */}
                                <div className="pt-1 pr-3" data-stop-row-click="true">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.has(item.id)}
                                        onChange={() => handleSelectRow(item.id)}
                                        className="rounded border-gray-300 text-[#042E27] focus:ring-[#042E27] w-3 h-3 cursor-pointer"
                                    />
                                </div>

                                <div className='flex items-start'>
                                    <div className="pt-1 pr-3 text-[#1F1F1F]">
                                        <CategoryIcon className="w-4 h-4 md:w-5 md:h-5 text-[#1F1F1F] shrink-0" />
                                    </div>

                                    {/* Message Body Content Grid */}
                                    <div className="flex-1 min-w-0 pr-8">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <h3 className="text-[16px] md:text-[18px] font-medium text-[#1A1A1A] w-[200px] lg:w-auto truncate" style={TYPOGRAPHY.body}>
                                                {item.title}
                                            </h3>

                                            {/* Action category tag configuration styling logic markup */}
                                            <span className={CATEGORY_TAG_STYLING[item.category]}>
                                                {item.category}
                                            </span>

                                            {item.category === 'Urgent' && (
                                                <span className="hidden lg:block text-[12px] text-[#A0A0A0] ml-1" style={TYPOGRAPHY.body}>
                                                    Action Required
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-[14px] md:text-[16px] text-[#858585] font-medium leading-relaxed mb-3 w-[270px] lg:w-auto truncate" style={TYPOGRAPHY.body}>
                                            {item.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-[14px] text-[#858585]">
                                            <span className="flex items-center gap-1.5" style={TYPOGRAPHY.body}>
                                                <Clock3 size={13} />
                                                {item.timestamp}
                                            </span>
                                        </div>

                                        {item.actionLabel && (
                                            <div className="mt-3" data-stop-row-click="true">
                                                <button
                                                    type="button"
                                                    onClick={() => handleActionClick(item)}
                                                    className="px-4 py-1.5 bg-[#042E27] text-white text-[13px] font-medium rounded-md hover:bg-[#03201B] transition-colors"
                                                    style={TYPOGRAPHY.body}
                                                >
                                                    {item.actionLabel}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Row Level Action Actions Overlay Controls */}
                                    <div className="absolute right-4 top-4" data-stop-row-click="true">
                                        <button
                                            type="button"
                                            disabled={deleteOneMutation.isPending}
                                            onClick={() => void handleDeleteSingle(item.id)}
                                            className="hidden lg:block text-gray-400 hover:text-[#D30A1A] transition-colors p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer"
                                            aria-label="Delete Notification item row data"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            {!isLoading && !isError && totalPages > 1 && (
                <div className="mt-6">
                    <TablePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    );
}