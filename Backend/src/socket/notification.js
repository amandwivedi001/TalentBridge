let ioInstance;

export const setIo = (io) => {
  ioInstance = io;
};

export const emitNotification = (
  userId,
  notification
) => {
  if (!ioInstance) return;

  ioInstance
    .to(`user:${userId}`)
    .emit(
      "new-notification",
      notification
    );
};