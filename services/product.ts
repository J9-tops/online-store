import {
  deleteProduct,
  getProducts,
  searchProduct,
  updateProduct,
} from "@/actions/product-actions";
import { ProductType } from "@/types/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
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

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProductType) => {
      const result = await updateProduct(data);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["search-products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const result = await deleteProduct(productId);
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["search-products"] });
    },
  });
}
