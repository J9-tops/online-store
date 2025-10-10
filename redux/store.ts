import cartSlice from "@/redux/features/cart/cartSlice";
import { authModalReducer } from "@/redux/features/modals";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import resetPasswordReducer from "./features/resetPassword";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authModal: authModalReducer,
    cart: cartSlice,
    resetPassword: resetPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
