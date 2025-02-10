"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, Path, useForm } from "react-hook-form";
import { ZodSchema } from "zod";
import { SlCalender } from "react-icons/sl";
import { format } from "date-fns";
import { FieldValues } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import Container from "./Container";
import { useState } from "react";

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "checkbox" | "textarea";
  placeholder?: string;
  description?: string;
}

interface GenericFormProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  defaultValues: T;
  apiEndpoint?: string;
  fields: FieldConfig[];
}

export function GenericForm<T extends FieldValues>({
  schema,
  defaultValues,
  fields,
}: GenericFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const [title, setTitle] = useState(defaultValues.title || "New sale");

  const onSubmit: (values: T) => Promise<void> = async (values: T) => {
    console.log("Form Submitted:", values);
    alert("Form submitted successfully!");
  };

  return (
    <Container className="w-full overflow-y-auto h-screen flex flex-col items-center pb-8 pt-4">
      <div className="self-start pl-16">
        <p>Sale</p>
        <h1 className="text-4xl font-bold">
          {title === "" ? "New Sale" : title}
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:w-[80%] my-5 flex flex-col gap-5"
        >
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name as Path<T>}
              render={({ field: controllerField }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>{field.label}</FormLabel>
                  {field.type === "text" || field.type === "number" ? (
                    <FormControl>
                      <Input
                        {...controllerField}
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={(e) => {
                          controllerField.onChange(e);
                          if (field.name === "title") {
                            setTitle(e.target.value);
                          }
                        }}
                      />
                    </FormControl>
                  ) : field.type === "date" ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !controllerField.value && "text-muted-foreground"
                            )}
                          >
                            {controllerField.value ? (
                              format(controllerField.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <SlCalender className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={controllerField.value}
                          onSelect={controllerField.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : field.type === "textarea" ? (
                    <FormControl>
                      <Textarea {...controllerField} />
                    </FormControl>
                  ) : (
                    <FormControl>
                      <Checkbox
                        checked={controllerField.value}
                        onCheckedChange={controllerField.onChange}
                      />
                    </FormControl>
                  )}
                  {field.description && (
                    <FormDescription>{field.description} </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="w-fit">
            Publish
          </Button>
        </form>
      </Form>
    </Container>
  );
}
