"use client";

import Container from "@/components/Container";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import useFileUpload from "@/hooks/useFileUpload";
import { cn } from "@/lib/utils";
import { saleConfig } from "@/types/config";
import { SaleSchema, SaleType } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SlCalender } from "react-icons/sl";
import { toast } from "react-toastify";
import { createSale } from "../../../actions/sale-action";

export default function FormWrapper() {
  const [title, setTitle] = useState(saleConfig.defaultValues.title);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<SaleType>({
    resolver: zodResolver(SaleSchema),
    defaultValues: saleConfig.defaultValues,
  });

  const validFromValue = watch("validFrom");
  const validUntilValue = watch("validUntil");

  const { handleFileUpload, progress, fileRef, status, imageURL, setStatus } =
    useFileUpload((url) => setValue("imageUrl", url));

  const onSubmit = async (data: SaleType) => {
    setSubmitting(true);

    const response = await createSale(data);

    if (response.success) {
      toast(response.message);
      setSubmitting(false);
    } else {
      toast(response.message);
      setSubmitting(false);
    }
  };

  return (
    <Container className="w-full overflow-y-auto h-screen flex flex-col items-center px-0 pt-4 relative">
      <div className="self-start pl-16">
        <p>Category</p>
        <h1 className="text-4xl font-bold capitalize">
          {title === "" ? "New Sale" : title}
        </h1>
      </div>
      <form
        id="form"
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-[80%] my-5 flex flex-col gap-5 grow"
      >
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="title">Sale Title</Label>
          <Input
            type="text"
            id="title"
            value={title}
            {...register("title")}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="description">Sale Description</Label>
          <Textarea rows={2} {...register("description")} id="description" />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="discountBadge">Discount Badge</Label>
          <Input
            type="text"
            id="discountBadge"
            {...register("discountBadge")}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="discountAmount">Discount Amount</Label>
          <Input
            type="number"
            id="discountAmount"
            {...register("discountAmount", { valueAsNumber: true })}
            max={100}
            min={0}
            step="0.01"
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="couponCode">Coupon Code</Label>
          <Input type="text" id="couponCode" {...register("couponCode")} />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="validFrom">Valid From</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !validFromValue && "text-muted-foreground"
                )}
              >
                {validFromValue ? (
                  format(validFromValue, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <SlCalender className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={validFromValue}
                onSelect={(date) => {
                  if (date) setValue("validFrom", date);
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="validUntil">Valid Until</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !validUntilValue && "text-muted-foreground"
                )}
              >
                {validUntilValue ? (
                  format(validUntilValue, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <SlCalender className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={validUntilValue}
                onSelect={(date) => {
                  if (date) setValue("validUntil", date);
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-x-2 flex items-center">
          <Label htmlFor="isActive">Is Active</Label>
          <Checkbox id="isActive" {...register("isActive")} className="m-0" />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="imageUrl">Sale Image</Label>
          <Input
            ref={fileRef}
            onChange={handleFileUpload}
            id="imageUrl"
            type="file"
            accept="image/*"
            className="cursor-pointer"
          />
          <Input
            type="hidden"
            {...register("imageUrl")}
            value={imageURL || ""}
          />
          {status === "uploading" && (
            <ProgressBar prev={0} current={progress} />
          )}
          {progress === 100 && imageURL !== "" && (
            <Image
              src={imageURL}
              alt="uploaded image"
              width={500}
              height={200}
              onLoad={() => setStatus("idle")}
              className="w-full object-contain"
            />
          )}
        </div>
      </form>
      <div className="sticky w-full bg-white p-4 bottom-0 left-0 right-0 border-t shadow-xl">
        <Button
          type="submit"
          className="w-fit"
          form="form"
          disabled={submitting}
        >
          {submitting ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </Container>
  );
}
