"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const [isClient, setIsClient] = useState(false);

  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Link
      href="/cart"
      className="flex items-center text-sm gap-2 border border-gray-200 px-2 py-1 rounded-md shadow-md hover:shadow-none hoverEffect"
    >
      <MdOutlineShoppingCart className="text-2xl text-darkBlue" />
      <div className="lg:flex flex-col hidden">
        <p className="text-xs">
          <span className="font-semibold">{items.length} </span>
          item{items.length > 1 ? "s" : ""}
        </p>
        <p className="font-semibold">Cart</p>
      </div>
    </Link>
  );
};

export default CartIcon;
