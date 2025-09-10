"use client";

import { addItem, getItemCount } from "@/redux/features/cart/cartSlice";
import { RootState } from "@/redux/store";
import { ProductType } from "@/types/schema";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import QuantityButtons from "./QuantityButtons";
import { Button } from "./ui/button";

interface Props {
  product: ProductType;
  className?: string;
}

const AddToCartButton = ({ className, product }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();

  const itemQuantity = useSelector((state: RootState) =>
    getItemCount(state, product?.id || "")
  );

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <div className="h-12">
      {itemQuantity > 0 ? (
        <QuantityButtons product={product} itemQuantity={itemQuantity} />
      ) : (
        <Button
          onClick={() => dispatch(addItem(product))}
          className={twMerge(
            "bg-darkBlue/10 border text-black border-darkBlue w-full py-2 mt-2 rounded-md font-medium hover:bg-darkBlue hover:text-gray-400 hoverEffect disabled:hover:cursor-not-allowed disabled:hover:bg-darkBlue/10 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:border-darkBlue/10",
            className
          )}
        >
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
