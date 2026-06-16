const users = new Map();

export const addUserSocket = (userId, socketId) => {
  if (!users.has(userId)) {
    users.set(userId, new Set());
  }

  users.get(userId).add(socketId);
};

export const removeUserSocket = (socketId) => {
  for (const [userId, sockets] of users.entries()) {
    if (sockets.has(socketId)) {
      sockets.delete(socketId);

      if (sockets.size === 0) {
        users.delete(userId);
      }

      break;
    }
  }
};

export const getUserSockets = (userId) => {
  return users.get(userId) || new Set();
};

export const getOnlineUsers = () => {
  return [...users.keys()];
};