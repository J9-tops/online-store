"use client";

import CartHeader from "@/components/CartHeader";
import CartTable from "@/components/CartTable";
import EmptyCart from "@/components/EmptyCart";
import MobileOrderSummary from "@/components/MobileOrderSummary";
import OrderSummary from "@/components/OrderSummary";
import {
  deleteCartProduct,
  getSubTotalPrice,
  getTotalPrice,
  resetCart,
} from "@/redux/features/cart/cartSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CartContent() {
  const [loading] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector(getTotalPrice);
  const subTotalPrice = useSelector(getSubTotalPrice);

  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      dispatch(resetCart());
      toast.success("Your cart reset successfully!");
    }
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteCartProduct(id));
    toast.success("Product removed from cart!");
  };

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="px-6">
      <CartHeader />
      <div className="grid lg:grid-cols-3 md:gap-8">
        <div className="lg:col-span-1">
          <OrderSummary
            subTotalPrice={subTotalPrice}
            totalPrice={totalPrice}
            loading={loading}
          />
        </div>

        <div className="lg:col-span-2 rounded-lg">
          <CartTable
            items={items}
            onDeleteProduct={handleDeleteProduct}
            onResetCart={handleResetCart}
          />
        </div>

        <MobileOrderSummary
          subTotalPrice={subTotalPrice}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
}
