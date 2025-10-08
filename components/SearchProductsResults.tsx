"use client";

import { ProductType } from "@/types/schema";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";

type Props = {
  product: ProductType[];
};

const SearchProductResults = ({ product }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {product?.map((product) => (
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

export default SearchProductResults;
