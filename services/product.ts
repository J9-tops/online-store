import { getProducts, searchProduct } from "@/actions/product-actions";
import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  return useQuery({
    queryKey: ["Products"],
    queryFn: async () => {
      const result = await getProducts();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.products || [];
    },
  });
}

export function useSearchProducts(
  searchTerm: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["search-products", searchTerm],
    queryFn: async () => {
      const result = await searchProduct(searchTerm);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.products || [];
    },
    enabled: options?.enabled ?? searchTerm.trim().length > 0,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
}
