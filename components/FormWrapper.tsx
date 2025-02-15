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
import useFileUpload from "@/hooks/useFileUpload";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { SlCalender } from "react-icons/sl";
import { ZodSchema } from "zod";
import Container from "./Container";
import ProgressBar from "./ProgressBar";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "checkbox" | "textarea" | "file";
  placeholder?: string;
  description?: string;
}

interface GenericFormProps<T extends FieldValues> {
  name: string;
  schema: ZodSchema<T>;
  defaultValues: T;
  apiEndpoint?: string;
  fields: FieldConfig[];
}

export function GenericForm<T extends FieldValues>({
  name,
  schema,
  defaultValues,
  fields,
}: GenericFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const { handleFileUpload, progress, fileRef, status, imageURL } =
    useFileUpload();

  const [title, setTitle] = useState(defaultValues.title);

  const onSubmit: (values: T) => Promise<void> = async (values: T) => {
    console.log("Form Submitted:", values);
    alert("Form submitted successfully!");
  };

  return (
    <Container className="w-full overflow-y-auto h-screen flex flex-col items-center pb-8 pt-4">
      <div className="self-start pl-16">
        <p>{`${name}`}</p>
        <h1 className="text-4xl font-bold">
          {title === "" ? `New ${name}` : title}
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
                  ) : field.type === "file" ? (
                    <>
                      <FormControl>
                        <Input
                          {...controllerField}
                          type={field.type}
                          ref={fileRef}
                          accept="image/*"
                          onChange={handleFileUpload}
                          placeholder={field.placeholder}
                          className="cursor-pointer"
                        />
                      </FormControl>
                      {status === "uploading" && (
                        <ProgressBar prev={0} current={progress} />
                      )}
                      {progress === 100 && imageURL !== "" && (
                        <Image
                          src={imageURL}
                          alt="uploaded image"
                          width={500}
                          height={200}
                          className="aspect-square w-full "
                        />
                      )}
                    </>
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
