"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useSales, useSearchSales } from "@/services/sale";
import { SaleType } from "@/types/schema";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import SaleCard from "./DataBarCard";

export default function SaleDataBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const {
    isLoading: isLoadingAll,
    error: allError,
    data: allSales,
  } = useSales();

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchSales(debouncedSearchTerm, {
    enabled: debouncedSearchTerm.trim().length > 0,
  });

  const sales = useMemo(() => {
    if (debouncedSearchTerm.trim().length > 0) {
      return searchResults || [];
    }
    return allSales || [];
  }, [debouncedSearchTerm, searchResults, allSales]);
  const isLoading =
    debouncedSearchTerm.trim().length > 0 ? isSearchLoading : isLoadingAll;
  const error = debouncedSearchTerm.trim().length > 0 ? searchError : allError;

  const isWaitingForDebounce =
    searchTerm !== debouncedSearchTerm && searchTerm.trim().length > 0;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsSearching(value.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 h-screen py-6">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search sales..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 h-screen py-6">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search sales..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="text-center p-8 text-red-600">
          Error loading categories: {error.message}
        </div>
      </div>
    );
  }

  if (!sales || sales.length === 0) {
    return <div className="text-center p-8 text-gray-600">No sales found</div>;
  }

  return (
    <div className="flex flex-col gap-4 h-screen py-6">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search sales..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {isSearching && sales.length > 0 && !isWaitingForDebounce && (
          <div className="mt-2 text-sm text-gray-600">
            Found {sales.length} {sales.length === 1 ? "sale" : "sales"}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {!sales || sales.length === 0 ? (
          <div className="text-center p-8 text-gray-600">
            {isSearching && !isWaitingForDebounce
              ? `No sales found for "${debouncedSearchTerm}"`
              : isWaitingForDebounce
              ? "Type to search sale..."
              : "No sales found"}
          </div>
        ) : (
          <div className="space-y-4">
            {sales.map((sale: SaleType) => (
              <SaleCard key={sale.id} sale={sale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
