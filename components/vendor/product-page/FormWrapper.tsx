"use client";

import { createProduct } from "@/actions/product-actions";
import Container from "@/components/Container";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { MultiSelectCombobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import useFileUpload from "@/hooks/useFileUpload";
import { productConfig } from "@/types/config";
import { productSchema, ProductType } from "@/types/schema";
import { CategoryType } from "@/types/vendor";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Option = {
  id: string;
  title: string;
  slug: string;
  description: string;
};

const statusOptions = ["Hot", "New", "Sale"];

interface FormWrapperProps {
  categories: CategoryType[];
}

export default function FormWrapper({ categories = [] }: FormWrapperProps) {
  const [title, setTitle] = useState(productConfig.defaultValues.title);
  const [submitting, setSubmitting] = useState(false);
  const [categoriesList] = useState<CategoryType[]>(categories);
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>(
    []
  );
  const [selectedStatus, setSelectedStatus] = useState<"Hot" | "New" | "Sale">(
    "New"
  );

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<ProductType>({
      resolver: zodResolver(productSchema),
      defaultValues: productConfig.defaultValues,
    });

  const { handleFileUpload, progress, fileRef, status, imageURL, setStatus } =
    useFileUpload((url) => setValue("imageUrl", url));

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
      .filter(Boolean) as CategoryType[];
    setSelectedCategories(selectedCategoryObjects);
    setValue("categories", values);
  };

  const onSubmit = async (data: ProductType) => {
    setSubmitting(true);
    const formData = {
      ...data,
      categories: selectedCategories.map((category) => category.id),
    };
    const response = await createProduct(formData);

    if (response.success) {
      setSubmitting(false);
      toast.success(response.message);
    } else {
      setSubmitting(false);
      toast.success(response.message);
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
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-[80%] my-5 flex flex-col gap-5 grow"
        id="product-form"
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
            value={selectedCategories.map((cat) => cat.id)}
          />
          <Input
            type="hidden"
            {...register("categories")}
            value={selectedCategories.map((cat) => cat.id)}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="status">Status</Label>
          <RadioGroup
            value={selectedStatus}
            onValueChange={(value) => {
              setSelectedStatus(value as "Hot" | "New" | "Sale");
              setValue("status", value as "Hot" | "New" | "Sale");
            }}
            className="flex flex-col gap-2"
          >
            {statusOptions.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <RadioGroupItem value={status} id={status} />
                <label htmlFor={status} className="text-sm">
                  {status}
                </label>
              </div>
            ))}
          </RadioGroup>
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
          form="product-form"
          disabled={submitting}
        >
          {submitting ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </Container>
  );
}
