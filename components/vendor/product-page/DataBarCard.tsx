import { ProductType } from "@/types/schema";
import { Package } from "lucide-react";

type Props = {
  product: ProductType;
};

const ProductCard = ({ product }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot":
        return "bg-red-500";
      case "New":
        return "bg-blue-500";
      case "Sale":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        {product.status && (
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 rounded text-xs font-medium text-white ${getStatusColor(
                product.status
              )}`}
            >
              {product.status}
            </span>
          </div>
        )}
        {product.label && (
          <div className="absolute top-3 right-3">
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-medium">
              {product.label}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ${product.price}
          </span>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Package size={16} />
            <span>{product.stock} left</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
