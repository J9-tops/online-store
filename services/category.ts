import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getCategoryProductCount } from "@/actions/category-actions";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await getAllCategories();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.categories || [];
    },
  });
}

export function useCategoryProductCount(categorySlug: string) {
  return useQuery({
    queryKey: ["category-product-count", categorySlug],
    queryFn: async () => {
      const result = await getCategoryProductCount(categorySlug);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.count || 0;
    },
    enabled: !!categorySlug, 
  });
}