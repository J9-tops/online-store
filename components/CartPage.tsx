"use client";
import Container from "@/components/Container";
import EmptyCart from "@/components/EmptyCart";
import Loader from "@/components/Loader";
import NoAccessToCart from "@/components/NoAccessToCart";
import PriceFormatter from "@/components/PriceFormatter";
import QuantityButtons from "@/components/QuantityButtons";
import { Button } from "@/components/ui/button";
import {
  deleteCartProduct,
  getSubTotalPrice,
  getTotalPrice,
  resetCart,
} from "@/redux/features/cart/cartSlice";
import { RootState } from "@/redux/store";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [loading] = useState(false);

  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector(getTotalPrice);
  const subTotalPrice = useSelector(getSubTotalPrice);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return <Loader />;
  }

  const handleResetCart = () => {
    const confirmed = window.confirm("Are you sure to reset your Cart?");
    if (confirmed) {
      dispatch(resetCart());
      toast.success("Your cart reset successfully!");
    }
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteCartProduct(id));
    toast.success("Product removed from cart!");
  };

  return (
    <div className="bg-gray-50 pb-10">
      {isSignedIn ? (
        <Container>
          {items?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              </div>
              <div className="grid lg:grid-cols-3 md:gap-8">
                <div className="lg:col-span-1">
                  <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                    </h2>
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
                </div>
                {/* Product View start */}
                <div className="lg:col-span-2 rounded-lg">
                  <div className="grid grid-cols-5 md:grid-cols-6 border rounded-tr-lg rounded-tl-lg bg-white p-2.5 text-base font-semibold">
                    <h2 className="col-span-2 md:col-span-3">Product</h2>
                    <h2>Price</h2>
                    <h2>Quantity</h2>
                    <h2>Total</h2>
                  </div>
                  <div className="border bg-white border-t-0 rounded-br-lg rounded-bl-lg">
                    {items?.map(({ product, quantity }) => {
                      return (
                        <div
                          key={product?.id}
                          className="grid grid-cols-5 md:grid-cols-6 border-b p-2.5 last:border-b-0"
                        >
                          <div className="col-span-2 md:col-span-3 flex items-center">
                            <Trash2
                              onClick={() => handleDeleteProduct(product?.id)}
                              className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
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
                          <QuantityButtons
                            product={product}
                            className="text-sm mb-3 mr-5"
                          />
                          <div className="flex items-center pl-3">
                            <PriceFormatter
                              amount={
                                product?.price ? product?.price * quantity : 0
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                    <Button
                      onClick={handleResetCart}
                      className="m-5 font-semibold"
                      variant="destructive"
                    >
                      Reset Cart
                    </Button>
                  </div>
                </div>

                <div className="md:hidden fixed bottom-0 left-0 w-full bg-lightBg">
                  <div className="bg-white p-4 rounded-lg border mx-4">
                    <h2 className="text-lg font-semibold mb-2">
                      Order Summary
                    </h2>
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
                {/* Product View end */}
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccessToCart />
      )}
    </div>
  );
};

export default CartPage;
