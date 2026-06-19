import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  isAuthenticated: false,
  loading: false,
  authInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAuthInitialized: (
      state,
      action
    ) => {
      state.authInitialized =
        action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setLoading,
  setAuthInitialized,
} = authSlice.actions;

export default authSlice.reducer;