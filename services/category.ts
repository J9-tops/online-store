import {
  getAllCategories,
  getCategoryProductCount,
  searchCategory,
} from "@/actions/category-actions";
import { useQuery } from "@tanstack/react-query";

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

export function useSearchCategories(
  searchTerm: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["search-categories", searchTerm],
    queryFn: async () => {
      const result = await searchCategory(searchTerm);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.categories || [];
    },
    enabled: options?.enabled ?? searchTerm.trim().length > 0,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
}
