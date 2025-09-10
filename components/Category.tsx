"use client";
import { getAllCategories } from "@/actions/category-actions";
import { useQuery } from "@tanstack/react-query";
import CategorySelector from "./CategorySelector";

export default function Category() {
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategories,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (data?.error) {
    return <p>Error: {data.error}</p>;
  }

  return (
    data?.categories && (
      <div className="py-5">
        <CategorySelector categories={data?.categories} />
      </div>
    )
  );
}
