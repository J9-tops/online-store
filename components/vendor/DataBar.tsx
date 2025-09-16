"use client";

import { usePathname } from "next/navigation";
import CategoryDataBar from "./category-page/DataBar";
import ProductDataBar from "./product-page/DataBar";
import SaleDataBar from "./sale-page/DataBar";

const DataBar = () => {
  const pathname = usePathname();

  function render(pathname: string) {
    switch (pathname) {
      case "/vendor/category":
        return <CategoryDataBar />;
      case "/vendor/sale":
        return <SaleDataBar />;
      case "/vendor/category":
        return <ProductDataBar />;
      default:
        return null;
    }
  }

  return (
    <div className="lg:w-[60%] lg:border-r lg:border-solid lg:border-gray-200 lg:h-screen px-4">
      {render(pathname)}
    </div>
  );
};

export default DataBar;
