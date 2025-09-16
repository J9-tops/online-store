"use client";

import { useCategoryProductCount } from "@/services/category";
import { CategoryType } from "@/types/schema";

type Props = {
  category: CategoryType;
};

const CategoryCard = ({ category }: Props) => {
  const { data: count, isLoading } = useCategoryProductCount(category.slug);

  return (
    <div className="bg-white rounded-lg border border-gray-200 py-1 shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full">
      <div className="relative flex items-center justify-center">
        <div className="text-center text-black">
          <h3 className="text-xl font-bold">{category.title}</h3>
        </div>
      </div>

      <div className="p-1 text-center">
        <p className="text-gray-600 text-sm mb-3">{category.description}</p>

        <span className="text-lg font-semibold text-black">
          {isLoading ? (
            <span className="animate-pulse">Loading...</span>
          ) : (
            `${count} Products`
          )}
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
