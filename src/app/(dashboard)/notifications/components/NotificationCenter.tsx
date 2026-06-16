'use client';

import { useState, useMemo } from 'react';
import { Trash2, Settings, CheckCircle2, Filter, Clock3, ArrowUpRight, TrendingUp, Smartphone, Mail, Wallet } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { cn } from '@/lib/utils';
import { SearchInputBar } from '@/components/watchlist/organisms/SearchInputBar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export type NotificationCategory = 'Urgent' | 'Portfolio' | 'Market' | 'Account' | 'Marketing' | 'Finance';

export interface NotificationItem {
    id: string;
    title: string;
    description: string;
    timestamp: string; // ISO format or string representation from API
    category: NotificationCategory;
    isUnread: boolean;
    actionLabel?: string;
    actionUrl?: string;
}

// Map categories to colors match the reference image mock design UI
const CATEGORY_TAG_STYLING: Record<NotificationCategory, string> = {
    'Urgent': 'bg-[#D4001A] text-white text-[12px] px-2 py-0.5 rounded',
    'Portfolio': 'bg-[#7D8A26] text-white text-[12px] px-2 py-0.5 rounded',
    'Market': 'bg-[#D4001A] text-white text-[12px] px-2 py-0.5 rounded', // Reference markup used identical color space or separate as needed
    'Account': 'bg-[#7A6FF0] text-white text-[12px] px-2 py-0.5 rounded',
    'Marketing': 'bg-[#D30A1A] text-white text-[12px] px-2 py-0.5 rounded',
    'Finance': 'bg-[#45B424] text-white text-[12px] px-2 py-0.5 rounded'
};

const CATEGORY_ICONS: Record<NotificationCategory, React.ComponentType<{ className?: string }>> = {
    'Urgent': Clock3,
    'Portfolio': ArrowUpRight,
    'Market': TrendingUp,
    'Account': Smartphone,
    'Marketing': Mail,
    'Finance': Wallet
};

interface NotificationCenterProps {
    initialNotifications?: NotificationItem[];
    onNotificationDelete?: (id: string) => Promise<void> | void;
    onMarkAllRead?: () => Promise<void> | void;
    onActionClick?: (notification: NotificationItem) => void;
    onSettingsClick?: () => void;
}

const mockDefaultNotifications: NotificationItem[] = [
    {
        id: '1',
        title: 'GreenTech Solutions deadline approaching',
        description: 'Only 15 days left to invest. You set a reminder for 3 days before closing.',
        timestamp: '28/08/2025',
        category: 'Urgent',
        isUnread: true,
        actionLabel: 'Invest Now'
    },
    {
        id: '2',
        title: 'Investment confirmed',
        description: 'Your ₦75,000 investment in GreenTech Solutions has been processed successfully.',
        timestamp: '19/08/2025',
        category: 'Portfolio',
        isUnread: true
    },
    {
        id: '3',
        title: 'Investment confirmed',
        description: 'Your ₦75,000 investment in GreenTech Solutions has been processed successfully.',
        timestamp: '19/08/2025',
        category: 'Portfolio',
        isUnread: true
    },
    {
        id: '4',
        title: 'Trade executed',
        description: 'Your sell order for 50 units of FoodTech Africa at ₦31/unit has been executed',
        timestamp: '05/08/2025',
        category: 'Market',
        isUnread: true
    },
    {
        id: '5',
        title: 'New device login',
        description: 'New login detected from MacBook Pro in Lagos. If this wasn\'t you, secure your account immediately.',
        timestamp: '30/07/2025',
        category: 'Account',
        isUnread: false
    },
    {
        id: '6',
        title: 'Weekly market insights',
        description: 'African startup funding increased 23% this quarter. Read our latest market analysis.',
        timestamp: '14/07/2025',
        category: 'Marketing',
        isUnread: false
    },
    {
        id: '7',
        title: 'Low wallet balance',
        description: 'Your wallet balance is ₦15,000. Fund your wallet to avoid missing investment opportunities.',
        timestamp: '07/07/2025',
        category: 'Finance',
        isUnread: false
    }
];

export function NotificationCenter({
    initialNotifications = mockDefaultNotifications,
    onNotificationDelete,
    onMarkAllRead,
    onActionClick,
}: NotificationCenterProps) {

    const router = useRouter()

    const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    // Compute unread runtime values
    const unreadCount = useMemo(() => {
        return notifications.filter(n => n.isUnread).length;
    }, [notifications]);

    // Handle search query updates
    const filteredNotifications = useMemo(() => {
        return notifications.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [notifications, searchQuery]);

    // Bulk action toggles
    const handleSelectAll = () => {
        if (selectedIds.size === filteredNotifications.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredNotifications.map(n => n.id)));
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

    const handleDeleteSingle = async (id: string) => {
        // Optimistic State update
        setNotifications(prev => prev.filter(n => n.id !== id));
        if (onNotificationDelete) await onNotificationDelete(id);
    };

    const handleMarkAllReadLocal = async () => {
        setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
        if (onMarkAllRead) await onMarkAllRead();
    };

    return (
        <div className="w-full bg-[#FAFAFA] min-h-screen">
            {/* Top Toolbar Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-[24px] md:text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                        Notification Center
                    </h1>
                    <p className="text-[16px] text-[#505050]" style={TYPOGRAPHY.body}>
                        Stay informed about your investments and account activities
                    </p>
                </div>

                {/* Configuration Buttons Header */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
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
                        onClick={handleMarkAllReadLocal}
                        className="flex items-center gap-2 px-4 py-2 border border-[#EAEAEA] bg-white rounded-lg text-[14px] text-[#1F1F1F] hover:bg-gray-50 transition-colors cursor-pointer"
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
                            Notifications ({unreadCount > 0 ? unreadCount : notifications.length})
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

                        <Select>
                            <SelectTrigger className="px-2.5 border-[#EAEAEA] bg-white rounded-md cursor-pointer text-[#2C2C2C] focus:ring-1 focus:ring-[#042E27]">
                                <div className="flex items-center gap-2 justify-between">
                                    <div className="flex items-center gap-1.5 truncate">
                                        <Filter className="h-4 w-4 text-[#2C2C2C] shrink-0" />
                                        <SelectValue placeholder="Filter" className="text-[16px]" style={TYPOGRAPHY.body} />
                                    </div>
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-[#EAEAEA] rounded-md shadow-lg">
                                <SelectItem value="all">All Risk</SelectItem>
                            </SelectContent>
                        </Select>

                        <label className="flex items-center gap-2 text-[16px] text-[#2C2C2C] cursor-pointer select-none ml-2">
                            <input
                                type="checkbox"
                                checked={selectedIds.size === filteredNotifications.length && filteredNotifications.length > 0}
                                onChange={handleSelectAll}
                                className="rounded border-gray-300 text-[#042E27] focus:ring-[#042E27] w-3 h-3"
                            />
                            <span>Select All</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Notifications Feed Area */}
            <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-[#F0F0F0] text-[#858585]" style={TYPOGRAPHY.body}>
                        No notifications found.
                    </div>
                ) : (
                    filteredNotifications.map((item) => {
                        const CategoryIcon = CATEGORY_ICONS[item.category] || ''
                        return (
                            <div
                                key={item.id}
                                className={cn(
                                    "flex items-center bg-white border rounded-xl p-4 transition-all relative group",
                                    item.isUnread ? "border-l-4 border-l-[#042E27]" : "border-[#F0F0F0]"
                                )}
                            >
                                {/* Checkbox selector */}
                                <div className="pt-1 pr-3">
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
                                            <h3 className="text-[16px] md:text-[18px] font-medium text-[#1A1A1A]" style={TYPOGRAPHY.body}>
                                                {item.title}
                                            </h3>

                                            {/* Action category tag configuration styling logic markup */}
                                            <span className={CATEGORY_TAG_STYLING[item.category]}>
                                                {item.category}
                                            </span>

                                            {item.category === 'Urgent' && (
                                                <span className="text-[12px] text-[#A0A0A0] ml-1" style={TYPOGRAPHY.body}>
                                                    Action Required
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-[14px] md:text-[16px] text-[#858585] font-medium leading-relaxed mb-3" style={TYPOGRAPHY.body}>
                                            {item.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-[14px] text-[#858585]">
                                            <span className="flex items-center gap-1.5" style={TYPOGRAPHY.body}>
                                                <Clock3 size={13} />
                                                {item.timestamp}
                                            </span>
                                        </div>

                                        {item.actionLabel && (
                                            <div className="mt-3">
                                                <button
                                                    type="button"
                                                    onClick={() => onActionClick && onActionClick(item)}
                                                    className="px-4 py-1.5 bg-[#042E27] text-white text-[13px] font-medium rounded-md hover:bg-[#03201B] transition-colors"
                                                    style={TYPOGRAPHY.body}
                                                >
                                                    {item.actionLabel}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Row Level Action Actions Overlay Controls */}
                                    <div className="absolute right-4 top-4">
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteSingle(item.id)}
                                            className="text-gray-400 hover:text-[#D30A1A] transition-colors p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer"
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
        </div>
    );
}