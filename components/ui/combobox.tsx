"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Option = {
  id: string;
  title: string;
  slug: string;
  description: string;
};

interface MultiSelectComboboxProps {
  options: Option[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelectCombobox({
  options,
  value = [],
  onChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search items...",
  emptyMessage = "No items found.",
  className,
  disabled = false,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    const currentValues = value || [];
    const isSelected = currentValues.includes(selectedValue);

    let newValues: string[];
    if (isSelected) {
      newValues = currentValues.filter((v) => v !== selectedValue);
    } else {
      newValues = [...currentValues, selectedValue];
    }

    onChange?.(newValues);
  };

  const handleRemove = (valueToRemove: string) => {
    const newValues = value.filter((v) => v !== valueToRemove);
    onChange?.(newValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full min-h-[40px] justify-between",
            !value?.length && "text-muted-foreground",
            className
          )}
        >
          <div className="flex flex-wrap gap-1">
            {value?.length > 0
              ? value.map((selectedValue) => {
                  const option = options.find(
                    (opt) => opt.id === selectedValue
                  );
                  return (
                    <Badge
                      key={selectedValue}
                      variant="secondary"
                      className="mr-1 py-1.5 h-full"
                    >
                      {option?.title || selectedValue}
                      <span
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleRemove(selectedValue);
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(selectedValue);
                        }}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </span>
                    </Badge>
                  );
                })
              : placeholder}
          </div>
          <ChevronsUpDown className="opacity-50 ml-2 flex-shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value?.includes(option.id);
                return (
                  <CommandItem
                    value={option.id}
                    key={option.id}
                    onSelect={() => handleSelect(option.id)}
                  >
                    {option.title}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
