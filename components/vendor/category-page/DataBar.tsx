"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useCategories, useSearchCategories } from "@/services/category";
import { CategoryType } from "@/types/schema";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import CategoryCard from "./DataBarCard";

export default function CategoryDataBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const {
    data: allCategories,
    isLoading: isLoadingAll,
    error: allError,
  } = useCategories();

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchCategories(debouncedSearchTerm, {
    enabled: debouncedSearchTerm.trim().length > 0,
  });

  const categories = useMemo(() => {
    if (debouncedSearchTerm.trim().length > 0) {
      return searchResults || [];
    }
    return allCategories || [];
  }, [debouncedSearchTerm, searchResults, allCategories]);

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
              placeholder="Search categories..."
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
              placeholder="Search categories..."
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

  return (
    <div className="flex flex-col gap-4 h-screen py-6">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search categories..."
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

        {isSearching && categories.length > 0 && !isWaitingForDebounce && (
          <div className="mt-2 text-sm text-gray-600">
            Found {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {!categories || categories.length === 0 ? (
          <div className="text-center p-8 text-gray-600">
            {isSearching && !isWaitingForDebounce
              ? `No categories found for "${debouncedSearchTerm}"`
              : isWaitingForDebounce
              ? "Type to search categories..."
              : "No categories found"}
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category: CategoryType) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
