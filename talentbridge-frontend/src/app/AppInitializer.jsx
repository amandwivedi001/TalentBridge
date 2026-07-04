import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import socket from "../services/socket";

import {
  setUser,
  clearUser,
  setLoading,
  setAuthInitialized,
} from "../features/auth/authSlice";

import {
  incrementUnreadCount,
} from "../features/notifications/notificationSlice";

import {
  getCurrentUser,
} from "../services/auth.service";

function AppInitializer({ children }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  // Initialize authentication
  useEffect(() => {
    const initializeAuth = async () => {
      dispatch(setLoading(true));

      try {
        const response = await getCurrentUser();

        dispatch(setUser(response));
      } catch (error) {
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false));
        dispatch(setAuthInitialized(true));
      }
    };

    initializeAuth();
  }, [dispatch]);

  useEffect(() => {

    if (!user?.id) return;

    if (!socket.connected) {

      socket.connect();

    }

    socket.emit(
      "register",
      user.id
    );

    const handleNotification = (
      notification
    ) => {

      dispatch(
        incrementUnreadCount()
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

  }, [user?.id, dispatch]);

  useEffect(() => {

    return () => {

      socket.disconnect();

    };

  }, []);

  return children;
}

export default AppInitializer;