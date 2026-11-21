export type NotificationCategory =
    | "Urgent"
    | "Portfolio"
    | "Market"
    | "Account"
    | "Marketing"
    | "Finance";

export interface ApiNotificationItem {
    id: number;
    title: string;
    description: string;
    timestamp: string;
    category: NotificationCategory;
    isUnread: boolean;
    actionLabel: string | null;
    actionUrl: string | null;
}

export interface NotificationListItem {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    category: NotificationCategory;
    isUnread: boolean;
    actionLabel?: string;
    actionUrl?: string;
}

export interface NotificationListParams {
    page?: number;
    pageSize?: number;
    category?: NotificationCategory | "all";
    isRead?: boolean;
    search?: string;
}

export interface NotificationListResponse {
    items: ApiNotificationItem[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    unreadCount: number;
}

export interface NotificationUnreadCountResponse {
    unreadCount: number;
}

export interface MarkNotificationReadResponse {
    id: number;
    isUnread: false;
    readAtUtc: string;
}

export interface MarkAllNotificationsReadResponse {
    updatedCount: number;
    unreadCount: number;
}

export interface DeleteNotificationResponse {
    id: number;
    deleted: true;
}

export interface BulkDeleteNotificationsResponse {
    deletedCount: number;
}