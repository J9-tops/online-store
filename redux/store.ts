import cartSlice from "@/redux/features/cart/cartSlice";
import { authModalReducer } from "@/redux/features/modals";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import categoryReducer from "./features/vendor/vendorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vendorCategory: categoryReducer,
    authModal: authModalReducer,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
