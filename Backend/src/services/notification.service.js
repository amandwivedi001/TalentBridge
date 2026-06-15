import prisma from "../config/prisma.js";
import { emitNotification }
from "../socket/notification.js";

export const createNotification = async (
  userId,
  title,
  message,
  type
) => {
  const notification =
    await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
      },
    });

  emitNotification(
    userId,
    notification
  );

  return notification;
};