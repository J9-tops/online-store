"use client";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { Button } from "./ui/button";

import { addItem, removeItem } from "@/redux/features/cart/cartSlice";
import { ProductType } from "@/types/schema";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";

interface Props {
  product: ProductType;
  className?: string;
  borderStyle?: string;
  itemQuantity?: number;
}

const QuantityButtons = ({
  className,
  borderStyle,
  product,
  itemQuantity,
}: Props) => {
  const dispatch = useDispatch();

  const incrementQuantity = () => {
    dispatch(addItem(product));
  };

  const decrementQuantity = () => {
    dispatch(removeItem(product.id ?? ""));
  };

  return (
    <div
      className={twMerge(
        "flex justify-between items-center pt-4 gap-1 pb-1 text-base",
        borderStyle,
        className
      )}
    >
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6"
        onClick={decrementQuantity}
      >
        <HiMinus />
      </Button>
      <p>{itemQuantity}</p>
      <Button
        variant="outline"
        size="icon"
        className="w-6 h-6"
        onClick={incrementQuantity}
      >
        <HiPlus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
