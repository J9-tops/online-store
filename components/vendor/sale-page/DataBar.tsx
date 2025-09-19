"use client";

import { useSales } from "@/services/sale";
import { SaleType } from "@/types/schema";
import SaleCard from "./DataBarCard";

export default function SaleDataBar() {
  const { isLoading, error, data } = useSales();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        Error loading sales: {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-8 text-gray-600">No categories found</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-screen py-6">
      {data.map((sale: SaleType) => (
        <SaleCard key={sale.id} sale={sale} />
      ))}
    </div>
  );
}
