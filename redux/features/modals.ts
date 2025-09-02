import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthModalState {
  isOpen: boolean;
  mode: "login" | "signup";
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
    openModal: (state, action: PayloadAction<"login" | "signup">) => {
      state.isOpen = true;
      state.mode = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    switchMode: (state) => {
      state.mode = state.mode === "login" ? "signup" : "login";
    },
  },
});

export const { openModal, closeModal, switchMode } = authModalSlice.actions;

export const authModalReducer = authModalSlice.reducer;
