import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../../../services/notification.service";

import {
    setUnreadCount,
    decrementUnreadCount,
    clearUnreadCount,
} from "../../../features/notifications/notificationSlice";

import NotificationList from "../../../components/recruiter/notifications/NotificationList";
import NotificationSkeleton from "../../../components/recruiter/notifications/NotificationSkeleton";

import socket from "../../../services/socket";

function StudentNotifications() {

    const dispatch = useDispatch();

    const unreadCount =
        useSelector(
            (state) =>
                state.notifications.unreadCount
        );

    const [notifications, setNotifications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [actionLoading, setActionLoading] =
        useState(false);

    useEffect(() => {

        fetchNotifications();

    }, []);

    useEffect(() => {

        const handleNotification =
            (notification) => {

                setNotifications(
                    (prev) => [
                        notification,
                        ...prev,
                    ]
                );

            };

        socket.on(
            "new-notification",
            handleNotification
        );

        return () => {

            socket.off(
                "new-notification",
                handleNotification
            );

        };

    }, []);

    const fetchNotifications =
        async () => {

            try {

                setLoading(true);

                const data =
                    await getNotifications();

                setNotifications(
                    data.notifications
                );

                dispatch(
                    setUnreadCount(
                        data.unreadCount
                    )
                );

            }

            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to load notifications."
                );

            }

            finally {

                setLoading(false);

            }

        };

    const handleNotificationClick =
        async (notification) => {

            if (notification.isRead) {
                return;
            }

            try {

                await markNotificationAsRead(
                    notification.id
                );

                setNotifications(
                    (prev) =>
                        prev.map((item) =>
                            item.id === notification.id
                                ? {
                                      ...item,
                                      isRead: true,
                                  }
                                : item
                        )
                );

                dispatch(
                    decrementUnreadCount()
                );

            }

            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to update notification."
                );

            }

        };

    const handleMarkAllRead =
        async () => {

            if (
                unreadCount === 0
            ) {
                return;
            }

            try {

                setActionLoading(true);

                await markAllNotificationsAsRead();

                setNotifications(
                    (prev) =>
                        prev.map(
                            (notification) => ({
                                ...notification,
                                isRead: true,
                            })
                        )
                );

                dispatch(
                    clearUnreadCount()
                );

                toast.success(
                    "All notifications marked as read."
                );

            }

            catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Unable to mark notifications."
                );

            }

            finally {

                setActionLoading(false);

            }

        };

    return (

        <div
            className="
                flex
                max-w-5xl
                flex-col
                gap-8
            "
            style={{
                margin: "0 auto",
            }}
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Notifications
                    </h1>

                    <p
                        className="
                            text-slate-500
                        "
                        style={{
                            marginTop: "0.5rem",
                        }}
                    >
                        Stay updated with your
                        applications, interview
                        progress, and hiring
                        updates.
                    </p>

                </div>

                <button
                    onClick={
                        handleMarkAllRead
                    }
                    disabled={
                        unreadCount === 0 ||
                        actionLoading
                    }
                    className="
                        rounded-xl
                        bg-indigo-600
                        font-semibold
                        text-white
                        transition
                        hover:bg-indigo-700
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                    style={{
                        padding: "0.75rem 1.25rem",
                    }}
                >
                    Mark all as read
                </button>

            </div>

            {loading ? (

                <NotificationSkeleton />

            ) : (

                <NotificationList
                    notifications={
                        notifications
                    }
                    onNotificationClick={
                        handleNotificationClick
                    }
                />

            )}

        </div>

    );

}

export default StudentNotifications;