import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setUser,
  clearUser,
  setLoading,
  setAuthInitialized,
} from "../features/auth/authSlice";

import {
  getCurrentUser,
} from "../services/auth.service";

function AppInitializer({
  children,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth =
      async () => {
        dispatch(setLoading(true));

        try {
          const response =
            await getCurrentUser();

          dispatch(
            setUser(
              response.data.data
            )
          );
        } catch (error) {
          dispatch(clearUser());
        } finally {
          dispatch(
            setLoading(false)
          );

          dispatch(
            setAuthInitialized(
              true
            )
          );
        }
      };

    initializeAuth();
  }, [dispatch]);

  return children;
}

export default AppInitializer;