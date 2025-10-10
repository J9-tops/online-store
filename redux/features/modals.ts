import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthModalState {
  isOpen: boolean;
  mode: "login" | "signup" | "forgot-password";
}

interface RootState {
  authModal: AuthModalState;
}

const initialState: AuthModalState = {
  isOpen: false,
  mode: "login",
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<"login" | "signup" | "forgot-password">
    ) => {
      state.isOpen = true;
      state.mode = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    switchMode: (
      state,
      action: PayloadAction<"login" | "signup" | "forgot-password">
    ) => {
      state.mode = action.payload;
    },
  },
});

export const { openModal, closeModal, switchMode } = authModalSlice.actions;

export const authModalReducer = authModalSlice.reducer;
