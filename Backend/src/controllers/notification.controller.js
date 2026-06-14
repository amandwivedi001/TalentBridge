import prisma from "../config/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getNotifications =
    asyncHandler(async (req, res) => {
        const userId = req.user.id;

        const [notifications, unreadCount] =
            await Promise.all([
                prisma.notification.findMany({
                    where: {
                        userId,
                    },

                    orderBy: {
                        createdAt: "desc",
                    },

                    select: {
                        id: true,
                        title: true,
                        message: true,
                        type: true,
                        isRead: true,
                        createdAt: true,
                    },
                }),

                prisma.notification.count({
                    where: {
                        userId,
                        isRead: false,
                    },
                }),
            ]);

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    unreadCount,
                    notifications,
                },
                "Notifications fetched successfully"
            )
        );
    });


export const markNotificationAsRead =
    asyncHandler(async (req, res) => {
        const userId = req.user.id;

        const { id } = req.params;

        const notification =
            await prisma.notification.findUnique({
                where: {
                    id,
                },
            });

        if (!notification) {
            throw new ApiError(
                404,
                "Notification not found"
            );
        }

        if (
            notification.userId !== userId
        ) {
            throw new ApiError(
                403,
                "Access denied"
            );
        }

        if (notification.isRead) {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    notification,
                    "Notification already marked as read"
                )
            );
        }

        const updatedNotification =
            await prisma.notification.update({
                where: {
                    id,
                },

                data: {
                    isRead: true,
                },
            });

        return res.status(200).json(
            new ApiResponse(
                200,
                updatedNotification,
                "Notification marked as read"
            )
        );
    });

export const markAllNotificationsAsRead =
    asyncHandler(async (req, res) => {
        const userId = req.user.id;

        const result =
            await prisma.notification.updateMany({
                where: {
                    userId,
                    isRead: false,
                },

                data: {
                    isRead: true,
                },
            });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    updatedCount: result.count,
                },
                "All notifications marked as read"
            )
        );
    });