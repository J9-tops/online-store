import { getProducts } from "@/actions/product-actions";
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
