import { getAllSales } from "@/actions/sale-action";
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
