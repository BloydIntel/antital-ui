import { request, unwrap } from "@/services/api-client";
import type { ApiResponse } from "@/types/api";
import type {
    BulkDeleteNotificationsResponse,
    DeleteNotificationResponse,
    MarkAllNotificationsReadResponse,
    MarkNotificationReadResponse,
    NotificationListParams,
    NotificationListResponse,
    NotificationUnreadCountResponse,
} from "@/types/notifications-api";
import { toApiError } from "@/lib/api-error";

const BASE = "/api/notifications";

function buildListQueryParams(params?: NotificationListParams): Record<string, string | number | boolean> {
    const query: Record<string, string | number | boolean> = {};

    if (!params) {
        return query;
    }

    if (params.page !== undefined) {
        query.page = params.page;
    }

    if (params.pageSize !== undefined) {
        query.pageSize = params.pageSize;
    }

    if (params.category && params.category !== "all") {
        query.category = params.category;
    }

    if (params.isRead !== undefined) {
        query.isRead = params.isRead;
    }

    const trimmedSearch = params.search?.trim();
    if (trimmedSearch) {
        query.search = trimmedSearch;
    }

    return query;
}

async function list(params?: NotificationListParams): Promise<NotificationListResponse> {
    try {
        const res = await request.get<ApiResponse<NotificationListResponse>>(BASE, {
            params: buildListQueryParams(params),
        });
        return unwrap(res.data);
    } catch (error) {
        throw toApiError(error);
    }
}

async function getUnreadCount(): Promise<NotificationUnreadCountResponse> {
    try {
        const res = await request.get<ApiResponse<NotificationUnreadCountResponse>>(`${BASE}/unread-count`);
        return unwrap(res.data);
    } catch (error) {
        throw toApiError(error);
    }
}

async function markOneRead(id: number): Promise<MarkNotificationReadResponse> {
    try {
        const encodedId = encodeURIComponent(String(id));
        const res = await request.patch<ApiResponse<MarkNotificationReadResponse>>(`${BASE}/${encodedId}/read`);
        return unwrap(res.data);
    } catch (error) {
        throw toApiError(error);
    }
}

async function markAllRead(): Promise<MarkAllNotificationsReadResponse> {
    try {
        const res = await request.post<ApiResponse<MarkAllNotificationsReadResponse>>(`${BASE}/mark-all-read`);
        return unwrap(res.data);
    } catch (error) {
        throw toApiError(error);
    }
}

async function deleteOne(id: number): Promise<DeleteNotificationResponse> {
    try {
        const encodedId = encodeURIComponent(String(id));
        const res = await request.delete<ApiResponse<DeleteNotificationResponse>>(`${BASE}/${encodedId}`);
        return unwrap(res.data);
    } catch (error) {
        throw toApiError(error);
    }
}

async function bulkDelete(ids: number[]): Promise<BulkDeleteNotificationsResponse> {
    try {
        const res = await request.post<ApiResponse<BulkDeleteNotificationsResponse>>(`${BASE}/bulk-delete`, { ids });
        return unwrap(res.data);
    } catch (error) {
        throw toApiError(error);
    }
}

const notificationService = {
    list,
    getUnreadCount,
    markOneRead,
    markAllRead,
    deleteOne,
    bulkDelete,
};

export default notificationService;