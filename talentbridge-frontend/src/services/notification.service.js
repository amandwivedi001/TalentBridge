import {api} from "./api";

export const getNotifications =
    async () => {

        const res =
            await api.get(
                "/api/notifications"
            );

        return res.data.data;

    };

export const getUnreadNotificationCount =
    async () => {

        const res =
            await api.get(
                "/api/notifications/unread"
            );

        return res.data.data;

    };

export const markNotificationAsRead =
    async (
        notificationId
    ) => {

        const res =
            await api.patch(
                `/api/notifications/${notificationId}/read`
            );

        return res.data.data;

    };

export const markAllNotificationsAsRead =
    async () => {

        const res =
            await api.patch(
                "/api/notifications/read-all"
            );

        return res.data.data;

    };