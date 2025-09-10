"use client";

import { getAllSales } from "@/actions/sale-action";
import { SaleType } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function DiscountBanner() {
  const { data: sales, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: getAllSales,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;
  return (
    <Carousel className="w-full max-w-screen-xl mx-auto mt-10 mb-5">
      <CarouselContent>
        {Array.isArray(sales) ? (
          sales.map((sale: SaleType) => (
            <CarouselItem key={sale?.id}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 p-6 md:px-12">
                      <Badge
                        variant="secondary"
                        className="mb-2 md:mb-4 text-darkBlue capitalize"
                      >
                        {sale?.discountBadge} {sale?.discountAmount}% off
                      </Badge>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2 md:mb-4">
                        {sale.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {sale?.description}
                      </p>
                      <p className="mb-4">
                        Use code:{" "}
                        <span className="font-semibold text-primary uppercase">
                          {sale.couponCode}
                        </span>{" "}
                        for{" "}
                        <span className="font-semibold">
                          {sale?.discountAmount}%
                        </span>{" "}
                        OFF
                      </p>
                      <Button>Shop Now</Button>
                    </div>

                    {sale?.imageUrl && (
                      <div className="w-full md:w-1/2 h-auto relative flex items-center justify-center py-2">
                        <Image
                          src={sale?.imageUrl}
                          alt={"bannerImage"}
                          width={500}
                          height={500}
                          priority
                          className="h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))
        ) : (
          <div className="w-full text-center py-8">
            <p className="text-red-500">
              {sales && typeof sales === "object" && "error" in sales
                ? sales.error
                : "No sales available."}
            </p>
          </div>
        )}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2" />
      <CarouselNext className="absolute right-2" />
    </Carousel>
  );
}
