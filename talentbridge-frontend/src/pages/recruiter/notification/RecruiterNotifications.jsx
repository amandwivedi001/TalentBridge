import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    setUnreadCount,
    decrementUnreadCount,
    clearUnreadCount,
} from "../../../features/notifications/notificationSlice";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../../../services/notification.service";

import NotificationList from "../../../components/recruiter/notifications/NotificationList";
import NotificationSkeleton from "../../../components/recruiter/notifications/NotificationSkeleton";
import socket from "../../../services/socket";
import { useSelector, useDispatch } from "react-redux";

function RecruiterNotifications() {

    const [notifications, setNotifications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const unreadCount =
        useSelector(

            (state) =>
                state.notifications.unreadCount

        );

    const dispatch =
        useDispatch();

    const [actionLoading, setActionLoading] =
        useState(false);

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

    useEffect(() => {

        fetchNotifications();

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

            if (
                notification.isRead
            ) {
                return;
            }

            try {

                await markNotificationAsRead(
                    notification.id
                );

                setNotifications(
                    (prev) =>
                        prev.map((item) =>
                            item.id ===
                                notification.id
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

                setActionLoading(
                    true
                );

                await markAllNotificationsAsRead();

                setNotifications(
                    (prev) =>
                        prev.map(
                            (
                                notification
                            ) => ({
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

                setActionLoading(
                    false
                );

            }

        };

    return (

        <div
            style={{
                margin: "0 auto",
                gap: "2rem",
            }}
            className="
                max-w-5xl
                flex
                flex-col
            "
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
                        style={{
                            marginTop: "0.5rem",
                        }}
                        className="
                            text-slate-500
                        "
                    >
                        Stay updated with
                        application activity
                        and hiring events.
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
                    style={{
                        padding: "0.75rem 1.25rem",
                    }}
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

export default RecruiterNotifications;