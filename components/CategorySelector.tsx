"use client";

import { cn } from "@/lib/utils";
import { CategoryType } from "@/types/schema";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Props = {
  categories: CategoryType[];
};

export default function CategorySelector({ categories }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>("");
  const router = useRouter();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories.find(
                (category: CategoryType) => category?.id === value
              )?.title
            : "Filter by Category"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            className="h-9"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                  c.title
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase())
                );
                if (selectedCategory?.slug) {
                  setValue(selectedCategory?.id);
                  router.push(`/categories/${selectedCategory.slug}`);
                  setOpen(false);
                }
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category: CategoryType) => (
                <CommandItem
                  key={category?.id}
                  value={category?.title}
                  onSelect={() => {
                    setValue(value === category?.id ? "" : category?.id);
                    router.push(`/categories/${category.slug}`);
                    setOpen(false);
                  }}
                >
                  {category?.title}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
