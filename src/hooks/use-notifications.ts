"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    CACHE_KEY_NOTIFICATIONS,
    CACHE_KEY_NOTIFICATION_UNREAD_COUNT,
} from "@/constants";
import notificationService from "@/services/notificationService";
import type { NotificationListParams } from "@/types/notifications-api";

export const notificationQueryKeys = {
    all: [CACHE_KEY_NOTIFICATIONS] as const,
    lists: () => [CACHE_KEY_NOTIFICATIONS, "list"] as const,
    list: (params?: NotificationListParams) =>
        [
            CACHE_KEY_NOTIFICATIONS,
            "list",
            {
                page: params?.page ?? 1,
                pageSize: params?.pageSize ?? 20,
                category: params?.category ?? "all",
                isRead: params?.isRead,
                search: params?.search?.trim() ?? "",
            },
        ] as const,
    unreadCount: () => [CACHE_KEY_NOTIFICATION_UNREAD_COUNT] as const,
};

export function useNotifications(params?: NotificationListParams) {
    const queryClient = useQueryClient();
    const queryKey = notificationQueryKeys.list(params);

    const query = useQuery({
        queryKey,
        queryFn: () => notificationService.list(params),
    });

    useEffect(() => {
        if (query.isSuccess && query.data) {
            queryClient.setQueryData(notificationQueryKeys.unreadCount(), {
                unreadCount: query.data.unreadCount,
            });
        }
    }, [query.isSuccess, query.data, queryClient]);

    return query;
}

export function useNotificationUnreadCount() {
    return useQuery({
        queryKey: notificationQueryKeys.unreadCount(),
        queryFn: () => notificationService.getUnreadCount(),
    });
}

export function useMarkNotificationRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => notificationService.markOneRead(id),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() }),
                queryClient.invalidateQueries({ queryKey: notificationQueryKeys.unreadCount() }),
            ]);
        },
    });
}

export function useMarkAllNotificationsRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => notificationService.markAllRead(),
        onSuccess: async (data) => {
            queryClient.setQueryData(notificationQueryKeys.unreadCount(), {
                unreadCount: data.unreadCount,
            });
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() }),
                queryClient.invalidateQueries({ queryKey: notificationQueryKeys.unreadCount() }),
            ]);
        },
    });
}

export function useDeleteNotification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => notificationService.deleteOne(id),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() }),
                queryClient.invalidateQueries({ queryKey: notificationQueryKeys.unreadCount() }),
            ]);
        },
    });
}

export function useBulkDeleteNotifications() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: number[]) => notificationService.bulkDelete(ids),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: notificationQueryKeys.lists() }),
                queryClient.invalidateQueries({ queryKey: notificationQueryKeys.unreadCount() }),
            ]);
        },
    });
}