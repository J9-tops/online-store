import PriceFormatter from "@/components/PriceFormatter";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderSummaryProps {
  subTotalPrice: number;
  totalPrice: number;
  loading: boolean;
}

const OrderSummary = ({
  subTotalPrice,
  totalPrice,
  loading,
}: OrderSummaryProps) => {
  return (
    <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>SubTotal</span>
          <PriceFormatter amount={subTotalPrice - totalPrice} />
        </div>

        <hr />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <PriceFormatter
            amount={totalPrice}
            className="text-lg font-bold text-black"
          />
        </div>

        <Button disabled={loading} className="w-full" size="lg">
          {loading ? "Processing" : "Proceed to Checkout"}
        </Button>

        <Link
          href="/"
          className="block text-center text-sm text-primary hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
