import { categorySchema, productSchema, SaleSchema } from "./schema";

const date = new Date();

export const saleConfig = {
  name: "Sale",
  schema: SaleSchema,
  defaultValues: {
    couponCode: "",
    description: "",
    discountAmount: "",
    discountBadge: "",
    isActive: true,
    title: "",
    validFrom: date,
    validUntil: date,
    imageUrl: "",
  },
  fields: [
    { name: "title", label: "Sale Title", type: "text" as const },
    {
      name: "description",
      label: "Sale Description",
      type: "textarea" as const,
    },
    {
      name: "discountBadge",
      label: "Discount Badge",
      type: "text" as const,
      description: "Discount Badge Ratio",
    },
    {
      name: "discountAmount",
      label: "Discount Amount",
      type: "number" as const,
      placeholder: "Amount off in percentage or fixed value",
    },
    { name: "couponCode", label: "Coupon Code", type: "text" as const },
    { name: "validFrom", label: "Valid From", type: "date" as const },
    { name: "validUntil", label: "Valid Until", type: "date" as const },
    { name: "isActive", label: "Is Active", type: "checkbox" as const },
    {
      name: "imageUrl",
      label: "Product Image",
      placeholder: "Drag or paste image here",
      type: "file" as const,
    },
  ],
};

export const categoryConfig = {
  name: "Category",
  schema: categorySchema,
  defaultValues: {
    title: "",
    slug: "",
    description: "",
  },
  fields: [
    { name: "title", label: "Title", type: "text" as const },
    { name: "slug", label: "Slug", type: "text" as const },
    { name: "description", label: "Description", type: "textarea" as const },
  ],
};

export const productConfig = {
  name: "Product",
  schema: productSchema,
  defaultValues: {
    title: "",
    slug: "",
    imageUrl: "",
    description: "",
    label: "",
    price: 0,
    categories: [],
    stock: 0,
    status: undefined,
  },
  fields: [
    { name: "title", label: "Product Name", type: "text" as const },
    {
      name: "slug",
      label: "Slug",
      type: "text" as const,
    },
    {
      name: "description",
      label: "Product Description",
      type: "textarea" as const,
    },
    {
      name: "label",
      label: "Label",
      type: "text" as const,
    },
    {
      name: "price",
      label: "Price",
      type: "number" as const,
    },
    {
      name: "stock",
      label: "Stock",
      type: "number" as const,
    },
    {
      name: "categories",
      label: "Categories",
      type: "checkbox" as const,
    },
    {
      name: "status",
      label: "Status",
      type: "text" as const,
    },
    {
      name: "imageUrl",
      label: "Product Image",
      placeholder: "Drag or paste image here",
      type: "file" as const,
    },
  ],
};
