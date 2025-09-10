import PriceFormatter from "@/components/PriceFormatter";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface MobileOrderSummaryProps {
  subTotalPrice: number;
  totalPrice: number;
}

const MobileOrderSummary = ({
  subTotalPrice,
  totalPrice,
}: MobileOrderSummaryProps) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-lightBg">
      <div className="bg-white p-4 rounded-lg border mx-4">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>SubTotal</span>
            <PriceFormatter amount={totalPrice} />
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <PriceFormatter amount={subTotalPrice - totalPrice} />
          </div>

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <PriceFormatter
              amount={totalPrice}
              className="text-lg font-bold text-black"
            />
          </div>

          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>

          <Link
            href="/"
            className="block text-center text-sm text-primary hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileOrderSummary;
