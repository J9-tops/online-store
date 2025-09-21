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
import { useDeleteSale, useUpdateSale } from "@/services/sale";
import { SaleSchema, SaleType } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SlCalender } from "react-icons/sl";
import { toast } from "react-toastify";

type Props = {
  sale: SaleType;
};

export default function FormWrapper({ sale }: Props) {
  const [title, setTitle] = useState(sale.title);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<SaleType>({
    resolver: zodResolver(SaleSchema),
    defaultValues: sale,
  });

  const validFromValue = watch("validFrom");
  const validUntilValue = watch("validUntil");
  const isActiveValue = watch("isActive");

  const {
    handleFileUpload,
    progress,
    fileRef,
    status,
    imageURL,
    setStatus,
    setImageURL,
  } = useFileUpload((url) => setValue("imageUrl", url));

  useEffect(() => {
    if (sale.imageUrl && !imageURL) {
      setImageURL(sale.imageUrl);
    }
  }, [sale.imageUrl, imageURL, setImageURL]);

  const router = useRouter();
  const { mutateAsync: update } = useUpdateSale();
  const { mutateAsync: deleteSale } = useDeleteSale();

  const onSubmit = async (data: SaleType) => {
    setSubmitting(true);
    try {
      const formattedData = {
        ...data,
        validFrom: new Date(data.validFrom),
        validUntil: new Date(data.validUntil),
        discountAmount: Number(data.discountAmount),
        imageUrl: imageURL || data.imageUrl,
      };

      const response = await update(formattedData);
      if (data.title !== sale.title) {
        const updatedSlug = response.sale?.slug || data.slug;
        router.replace(`/vendor/sale/${updatedSlug}`);
      } else {
        router.refresh();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to update sale");
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (data: SaleType) => {
    if (!data.id) return;

    setDeleting(true);
    try {
      const response = await deleteSale(data.id);
      if (response.success) {
        toast.success(response.message);
        router.replace("/vendor/sale");
      } else {
        toast.error(response.message || "Failed to delete sale");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to delete sale");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container className="w-full overflow-y-auto h-screen flex flex-col items-center px-0 pt-4 relative">
      <div className="self-start pl-16">
        <p>Sale</p>
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
          <Checkbox
            id="isActive"
            checked={isActiveValue}
            onCheckedChange={(checked) =>
              setValue("isActive", checked as boolean)
            }
            className="m-0"
          />
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
          {imageURL && (
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
      <div className="sticky w-full bg-white p-4 space-x-4 bottom-0 left-0 right-0 border-t shadow-xl">
        <Button
          id="form"
          type="submit"
          className="w-fit"
          form="form"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update"}
        </Button>
        {sale.id && (
          <Button
            type="button"
            className="w-fit"
            variant="destructive"
            disabled={deleting}
            onClick={() => onDelete(sale)}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        )}
      </div>
    </Container>
  );
}
