import { getAllSales, searchSale } from "@/actions/sale-action";
import { useQuery } from "@tanstack/react-query";

export function useSales() {
  return useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const result = await getAllSales();
      if (result.error) {
        throw new Error(result.error);
      }
      return result.sales || [];
    },
  });
}

export function useSearchSales(
  searchTerm: string,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["search-sale"],
    queryFn: async ({}) => {
      const result = await searchSale(searchTerm);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.sales || [];
    },
    enabled: options?.enabled ?? searchTerm.trim().length > 0,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
}
