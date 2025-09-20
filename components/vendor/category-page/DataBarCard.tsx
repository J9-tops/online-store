"use client";

import { useCategoryProductCount } from "@/services/category";
import { CategoryType } from "@/types/schema";
import { Tag } from "lucide-react";

type Props = {
  category: CategoryType;
};

const CategoryCard = ({ category }: Props) => {
  const { data: count, isLoading } = useCategoryProductCount(category.slug);

  return (
    <div className="bg-white rounded-lg border border-gray-200 py-1 shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full flex gap-3 px-2">
      <div className="p-1 border border-gray-500 rounded-sm w-fit my-auto">
        <Tag size={16} className="text-gray-500" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <h3 className="text-base font-bold">{category.title}</h3>
        <div className="flex text-xs justify-between items-center">
          <p className="text-gray-600">{category.description}</p>

          <span className="font-semibold text-black">
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              `${count} Products`
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
