"use client";

import { SaleType } from "@/types/schema";
import Image from "next/image";

type Props = {
  sale: SaleType;
};

const SaleCard = ({ sale }: Props) => {
  return (
    <a
      href={`/vendor/sale/${sale.slug}`}
      className="bg-white cursor-pointer rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow w-full flex gap-3 py-2 px-3 relative"
    >
      <div className="p-1 border border-gray-200 rounded-sm w-fit h-fit my-auto">
        <Image alt={sale.title} src={sale.imageUrl} width={40} height={40} />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <h3 className="text-base font-bold">{sale.title}</h3>
        <p className="text-gray-600">{sale.description}</p>
      </div>
      <div className="absolute top-1 right-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            sale.isActive ? "bg-green-500 text-white" : "bg-gray-400 text-white"
          }`}
        >
          {sale.isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </a>
  );
};

export default SaleCard;
