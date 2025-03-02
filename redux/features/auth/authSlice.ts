import { createSlice } from "@reduxjs/toolkit";

const loadUserFromStorage = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    const expiresAt = localStorage.getItem("expiresAt");

    if (user && expiresAt && Date.now() < Number(expiresAt)) {
      return JSON.parse(user);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("expiresAt");
    }
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadUserFromStorage(),
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;

      if (typeof window !== "undefined") {
        const expiration = Date.now() + 60 * 60 * 1000; // Expires in 1 hour
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("expiresAt", expiration.toString());
      }
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoading = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("expiresAt");
      }
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
