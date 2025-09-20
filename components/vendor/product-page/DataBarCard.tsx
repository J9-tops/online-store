import { ProductType } from "@/types/schema";
import Image from "next/image";

type Props = {
  product: ProductType;
};

export default function ProductCard({ product }: Props) {
  return (
    <a
      href={`/vendor/product/${product.slug}`}
      className="bg-white cursor-pointer rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-none transition-shadow w-full flex gap-3 py-2 px-3 relative"
    >
      <div className="p-1 border border-gray-200 rounded-sm w-fit h-fit my-auto">
        <Image
          alt={product.title}
          src={product.imageUrl}
          width={40}
          height={40}
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1 w-full">
          <h3 className="text-base font-bold">{product.title}</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
        <span className="w-10 text-sm ">{product.stock} left</span>
      </div>
    </a>
  );
}
