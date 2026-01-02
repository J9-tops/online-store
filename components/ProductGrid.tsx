"use client";

import { getAllProducts } from "@/actions/product-actions";
import { ProductType } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "./ProductCardSkeleton";

const ProductGrid = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <ProductGridSkeleton />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {data?.products?.map((product: ProductType) => (
        <AnimatePresence key={product?.id}>
          <motion.div
            layout
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProductCard
              key={product?.id}
              product={{
                ...product,
                categories: product.categories,
              }}
            />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
};

export default ProductGrid;
