"use client";

import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomRadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
}

export default function CustomRadioGroup({
  options,
  value,
  onChange,
  name,
  className,
  orientation = "vertical",
  disabled = false,
}: CustomRadioGroupProps) {
  const handleChange = (optionValue: string) => {
    if (disabled) return;
    onChange?.(optionValue);
  };

  return (
    <div
      className={cn(
        "flex gap-2",
        orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
        className
      )}
      role="radiogroup"
    >
      {options.map((option) => (
        <div
          key={option.value}
          className={cn(
            "flex items-center space-x-2 cursor-pointer",
            (disabled || option.disabled) && "cursor-not-allowed opacity-50"
          )}
          onClick={() => !option.disabled && handleChange(option.value)}
        >
          <div className="relative">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => handleChange(option.value)}
              disabled={disabled || option.disabled}
              className="sr-only"
            />
            <div
              className={cn(
                "h-4 w-4 rounded-full border-2 transition-all duration-200",
                value === option.value
                  ? "border-primary bg-primary"
                  : "border-gray-300 bg-white hover:border-primary/50",
                (disabled || option.disabled) && "border-gray-200"
              )}
            >
              {value === option.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              )}
            </div>
          </div>
          <label
            htmlFor={`${name}-${option.value}`}
            className={cn(
              "text-sm font-medium cursor-pointer select-none",
              (disabled || option.disabled) && "cursor-not-allowed"
            )}
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
