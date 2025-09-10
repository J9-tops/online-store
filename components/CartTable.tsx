import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/schema";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItem {
  product: ProductType;
  quantity: number;
}

interface CartTableProps {
  items: CartItem[];
  onDeleteProduct: (id: string) => void;
  onResetCart: () => void;
}

const CartTable = ({ items, onDeleteProduct, onResetCart }: CartTableProps) => {
  return (
    <>
      <div className="grid grid-cols-5 md:grid-cols-6 border rounded-tr-lg rounded-tl-lg bg-white p-2.5 text-base font-semibold">
        <h2 className="col-span-2 md:col-span-3">Product</h2>
        <h2>Price</h2>
        <h2>Quantity</h2>
        <h2>Total</h2>
      </div>

      <div className="border bg-white border-t-0 rounded-br-lg rounded-bl-lg">
        {items?.map(({ product, quantity }) => (
          <div
            key={product?.id}
            className="grid grid-cols-5 md:grid-cols-6 border-b p-2.5 last:border-b-0"
          >
            <div className="col-span-2 md:col-span-3 flex items-center">
              <Trash2
                onClick={() => onDeleteProduct(product?.id ?? "")}
                className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect cursor-pointer"
              />
              {product?.imageUrl && (
                <div className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group">
                  <Image
                    src={product.imageUrl}
                    alt="productImage"
                    width={300}
                    height={300}
                    loading="lazy"
                    className="w-10 h-10 md:w-full md:h-14 object-cover group-hover:scale-105 overflow-hidden transition-transform duration-500"
                  />
                </div>
              )}
              <h2 className="text-sm">{product.title}</h2>
            </div>

            <div className="flex items-center">
              <PriceFormatter amount={product?.price} />
            </div>

            <QuantityButtons product={product} className="text-sm mb-3 mr-5" />

            <div className="flex items-center pl-3">
              <PriceFormatter
                amount={product?.price ? product?.price * quantity : 0}
              />
            </div>
          </div>
        ))}

        <Button
          onClick={onResetCart}
          className="m-5 font-semibold"
          variant="destructive"
        >
          Reset Cart
        </Button>
      </div>
    </>
  );
};

export default CartTable;
