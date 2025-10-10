import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResetPasswordState {
  token: string | null;
  isResetting: boolean;
}

const initialState: ResetPasswordState = {
  token: null,
  isResetting: false,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    startReset: (state) => {
      state.isResetting = true;
    },
    endReset: (state) => {
      state.isResetting = false;
    },
  },
});

export const { setToken, clearToken, startReset, endReset } =
  resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
