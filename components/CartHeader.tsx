import { ShoppingBag } from "lucide-react";

const CartHeader = () => {
  return (
    <div className="flex items-center gap-2 py-5">
      <ShoppingBag className="h-6 w-6 text-primary" />
      <h1 className="text-2xl font-semibold">Shopping Cart</h1>
    </div>
  );
};

export default CartHeader;
