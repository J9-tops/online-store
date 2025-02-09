import Link from "next/link";
import React from "react";
import { BiCategory } from "react-icons/bi";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Sidebar = () => {
  return (
    <aside className="flex lg:flex-col lg:w-[25%] lg:border-r lg:border-solid lg:border-black gap-2 lg:gap-0 lg:min-h-screen">
      <Link
        href={"/vendor/category"}
        className="flex lg:justify-start lg:items-center text-sm gap-2 border border-black border-solid lg:border-b lg:border-gray-200 p-2 rounded-md flex-1 justify-center lg:flex-initial"
      >
        <BiCategory />
        <span className="hidden lg:block">Category</span>
      </Link>
      <Link
        href={"/vendor/sale"}
        className="flex lg:justify-start lg:items-center text-sm gap-2 border border-black border-solid lg:border-b lg:border-gray-200 p-2 rounded-md flex-1 justify-center lg:flex-initial"
      >
        <IoPricetagsOutline />
        <span className="hidden lg:block">Sale</span>
      </Link>
      <Link
        href={"/vendor/product"}
        className="flex lg:justify-start lg:items-center text-sm gap-2 border border-black border-solid lg:border-b lg:border-gray-200 p-2 rounded-md flex-1 justify-center lg:flex-initial"
      >
        <MdAddShoppingCart />
        <span className="hidden lg:block">Product</span>
      </Link>
      <Link
        href={"/vendor/order"}
        className="flex lg:justify-start lg:items-center text-sm gap-2 border border-black border-solid lg:border-b lg:border-gray-200 p-2 rounded-md flex-1 justify-center lg:flex-initial"
      >
        <HiOutlineShoppingBag />
        <span className="hidden lg:block">Orders</span>
      </Link>
    </aside>
  );
};

export default Sidebar;
