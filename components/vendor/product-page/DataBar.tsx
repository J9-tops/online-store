import { useProducts } from "@/services/product";
import { ProductType } from "@/types/schema";
import ProductCard from "./DataBarCard";

export default function ProductDataBar() {
  const { isLoading, error, data } = useProducts();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        Error loading product: {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-8 text-gray-600">No product found</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-screen py-6">
      {data.map((product: ProductType) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
