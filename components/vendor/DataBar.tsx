"use client";

import { usePathname } from "next/navigation";
import CategoryDataBar from "./category-page/DataBar";
import ProductDataBar from "./product-page/DataBar";
import SaleDataBar from "./sale-page/DataBar";

const DataBar = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/vendor/category")) {
    return (
      <div className="lg:w-[60%] lg:border-r lg:border-solid lg:border-gray-200 lg:h-screen px-4">
        <CategoryDataBar />
      </div>
    );
  }

  if (pathname.startsWith("/vendor/sale")) {
    return (
      <div className="lg:w-[60%] lg:border-r lg:border-solid lg:border-gray-200 lg:h-screen px-4">
        <SaleDataBar />
      </div>
    );
  }

  if (pathname.startsWith("/vendor/product")) {
    return (
      <div className="lg:w-[60%] lg:border-r lg:border-solid lg:border-gray-200 lg:h-screen px-4">
        <ProductDataBar />
      </div>
    );
  }

  return null;
};

export default DataBar;
