"use client";

import Container from "@/components/Container";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { MultiSelectCombobox } from "@/components/ui/combobox";
import CustomRadioGroup from "@/components/ui/custom-radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useFileUpload from "@/hooks/useFileUpload";
import { useDeleteProduct, useUpdateProduct } from "@/services/product";
import { CategoryType, productSchema, ProductType } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const statusOptions = [
  { value: "Hot", label: "Hot" },
  { value: "New", label: "New" },
  { value: "Sale", label: "Sale" },
];

interface FormWrapperProps {
  product: ProductType;
}

export default function FormWrapper({ product }: FormWrapperProps) {
  const [title, setTitle] = useState(product.title);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [categoriesList] = useState<(CategoryType & { id: string })[]>(
    product.categories.filter(
      (cat): cat is CategoryType & { id: string } => typeof cat.id === "string"
    )
  );

  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(
    (product.categories || []).filter(
      (cat): cat is CategoryType & { id: string } => typeof cat.id === "string"
    )
  );
  const [selectedStatus, setSelectedStatus] = useState<"Hot" | "New" | "Sale">(
    product.status || "New"
  );

  const { register, handleSubmit, setValue } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });

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
    if (product.imageUrl && !imageURL) {
      setImageURL(product.imageUrl);
    }
  }, [product.imageUrl, imageURL, setImageURL]);

  const router = useRouter();
  const { mutateAsync: update } = useUpdateProduct();
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  const generateSlug = () => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
    setValue("slug", generatedSlug);
  };

  const handleCategoriesChange = (values: string[]) => {
    const selectedCategoryObjects = values
      .map((categoryId) => categoriesList.find((cat) => cat.id === categoryId))
      .filter((cat): cat is CategoryType & { id: string } => !!cat?.id);
    setSelectedCategories(selectedCategoryObjects);
    setValue("categories", selectedCategoryObjects);
  };

  const handleStatusChange = (value: string) => {
    const status = value as "Hot" | "New" | "Sale";
    setSelectedStatus(status);
    setValue("status", status);
  };

  const onSubmit = async (data: ProductType) => {
    setSubmitting(true);
    try {
      const formattedData: ProductType = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        categories: selectedCategories,
        imageUrl: imageURL || data.imageUrl,
      };

      const response = await update(formattedData);
      if (data.title !== product.title) {
        const updatedSlug = response.product?.slug || data.slug;
        router.replace(`/vendor/product/${updatedSlug}`);
      } else {
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (data: ProductType) => {
    if (!data.id) return;

    setDeleting(true);
    try {
      const response = await deleteProduct(data.id);
      if (response.success) {
        toast.success(response.message);
        router.replace("/vendor/product");
      } else {
        toast.error(response.message || "Failed to delete product");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container className="w-full overflow-y-auto h-screen flex flex-col items-center px-0 pt-4 relative">
      <div className="self-start pl-16">
        <p>Product</p>
        <h1 className="text-4xl font-bold capitalize">
          {title === "" ? "New Product" : title}
        </h1>
      </div>
      <form
        id="form"
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-[80%] my-5 flex flex-col gap-5 grow"
      >
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="title">Product Name</Label>
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
          <Label htmlFor="slug">Slug</Label>
          <div className="flex items-center gap-2">
            <Input type="text" id="slug" {...register("slug")} />
            <Button type="button" onClick={generateSlug}>
              Generate
            </Button>
          </div>
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="description">Description</Label>
          <Textarea rows={3} {...register("description")} />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="label">Label</Label>
          <Input type="text" id="label" {...register("label")} />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            {...register("price", { valueAsNumber: true })}
            min={0}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="stock">Stock</Label>
          <Input
            type="number"
            id="stock"
            {...register("stock", { valueAsNumber: true })}
            min={0}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="categories">Categories</Label>
          <MultiSelectCombobox
            options={categoriesList ?? []}
            className=""
            emptyMessage="No category found"
            onChange={handleCategoriesChange}
            placeholder="Choose Categories"
            searchPlaceholder="Search Categories"
            value={selectedCategories.map((cat) => cat.id!)}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="status">Status</Label>
          <CustomRadioGroup
            name="status"
            options={statusOptions}
            value={selectedStatus}
            onChange={handleStatusChange}
            orientation="vertical"
            className="gap-3"
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="imageUrl">Product Image</Label>
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
        {product.id && (
          <Button
            type="button"
            className="w-fit"
            variant="destructive"
            disabled={deleting}
            onClick={() => onDelete(product)}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        )}
      </div>
    </Container>
  );
}
