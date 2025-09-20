import {
  deleteSale,
  getAllSales,
  searchSale,
  updateSale,
} from "@/actions/sale-action";
import { SaleType } from "@/types/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useUpdateSale() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SaleType) => {
      const result = await updateSale(data);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["active-sales"] });
      queryClient.invalidateQueries({ queryKey: ["search-sales"] });
    },
  });
}

export function useDeleteSale() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (saleId: string) => {
      const result = await deleteSale(saleId);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["active-sales"] });
      queryClient.invalidateQueries({ queryKey: ["search-sales"] });
    },
  });
}
