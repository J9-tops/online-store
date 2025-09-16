import { SaleType } from "@/types/schema";
import { Tag } from "lucide-react";

type Props = {
  sale: SaleType;
};

const SaleCard = ({ sale }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={sale.imageUrl}
          alt={sale.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              sale.isActive
                ? "bg-green-500 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {sale.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {sale.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-600">
            {sale.discountAmount}% OFF
          </span>
          <Tag className="text-gray-400" size={20} />
        </div>
      </div>
    </div>
  );
};

export default SaleCard;
