import { ApiNotificationItem, NotificationListItem } from "@/types/notifications-api";

export function formatNotificationTimestamp(isoTimestamp: string): string {
    const parsed = new Date(isoTimestamp);
    if (Number.isNaN(parsed.getTime())) {
        return isoTimestamp;
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
    }).format(parsed);
}

export function toNotificationListItem(item: ApiNotificationItem): NotificationListItem {
    return {
        id: String(item.id),
        title: item.title,
        description: item.description,
        timestamp: formatNotificationTimestamp(item.timestamp),
        category: item.category,
        isUnread: item.isUnread,
        actionLabel: item.actionLabel ?? undefined,
        actionUrl: item.actionUrl ?? undefined,
    };
}