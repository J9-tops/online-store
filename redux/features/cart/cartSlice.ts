import { ProductType } from "@/types/schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product: ProductType;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductType>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.reduce((acc, item) => {
        if (item.product.id === action.payload) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as CartItem[]);
    },

    deleteCartProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        ({ product }) => product.id !== action.payload
      );
    },

    resetCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, deleteCartProduct, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const getTotalPrice = (state: { cart: CartState }) => {
  return state.cart.items.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0
  );
};

export const getSubTotalPrice = (state: { cart: CartState }) => {
  return state.cart.items.reduce((total, item) => {
    const price = item.product.price ?? 0;
    return total + price * item.quantity;
  }, 0);
};

export const getItemCount = (state: { cart: CartState }, productId: string) => {
  const item = state.cart.items.find((item) => item?.product?.id === productId);
  return item ? item.quantity : 0;
};

export const getGroupedItems = (state: { cart: CartState }) => state.cart.items;
