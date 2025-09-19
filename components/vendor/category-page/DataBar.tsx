"use client";

import { useCategories } from "@/services/category";
import { CategoryType } from "@/types/schema";
import CategoryCard from "./DataBarCard";

export default function CategoryDataBar() {
  const { data: categories, isLoading, error } = useCategories();

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
        Error loading categories: {error.message}
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center p-8 text-gray-600">No categories found</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-screen py-6">
      {categories.map((category: CategoryType) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
