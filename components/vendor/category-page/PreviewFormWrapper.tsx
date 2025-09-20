"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDeleteCategory, useUpdateCategory } from "@/services/category";
import { categorySchema, CategoryType } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  category: CategoryType;
};

export default function PreviewFormWrapper({ category }: Props) {
  const { handleSubmit, register, setValue, reset } = useForm<CategoryType>({
    resolver: zodResolver(categorySchema),
    defaultValues: category,
  });

  const [title, setTitle] = useState(category.title);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const { mutateAsync: update } = useUpdateCategory();
  const { mutateAsync: deleteCategory } = useDeleteCategory();

  const generateSlug = () => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
    setValue("slug", generatedSlug);
  };

  const onSubmit = async (data: CategoryType) => {
    setSubmitting(true);
    const response = await update(data);
    if (response.success) {
      toast(response.message);
      setSubmitting(false);
      if (data.slug !== category.slug) {
        const updatedSlug = response.category?.slug || data.slug;
        router.replace(`/vendor/category/${updatedSlug}`);
      } else {
        router.refresh();
      }
    } else {
      toast(response.message);
      setSubmitting(false);
    }
  };

  const onDelete = async (data: CategoryType) => {
    setDeleting(true);
    if (data.id) {
      const response = await deleteCategory(data?.id);
      if (response.success) {
        toast(response.message);
        setDeleting(false);
        router.replace("/vendor/category");
      } else {
        toast(response.message);
        setDeleting(false);
      }
    }
    setDeleting(false);
  };

  return (
    <Container className="w-full overflow-y-auto h-screen flex flex-col items-center px-0 pt-4 relative">
      <div className="self-start pl-16">
        <p>Category</p>
        <h1 className="text-4xl font-bold">
          {title === "" ? `New Category` : title}
        </h1>
      </div>
      <form
        id="form"
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-[80%] my-5 flex flex-col gap-5 grow"
      >
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
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
          <Textarea rows={4} {...register("description")} />
        </div>
      </form>
      <div className="sticky w-full bg-white space-x-4 p-4 bottom-0 left-0 right-0 border-t shadow-xl">
        <Button
          id="form"
          type="submit"
          className="w-fit"
          form="form"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update"}
        </Button>
        {category.id && (
          <Button
            type="button"
            className="w-fit"
            variant="destructive"
            disabled={deleting}
            onClick={() => onDelete(category)}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        )}
      </div>
    </Container>
  );
}
