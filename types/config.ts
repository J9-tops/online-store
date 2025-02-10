import { SaleSchema } from "./schema";

const date = new Date();

export const saleConfig = {
  schema: SaleSchema,
  defaultValues: {
    badge: "",
    couponCode: "",
    description: "",
    discountAmount: "",
    isActive: true,
    title: "",
    validFrom: date,
    validUntil: date,
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
  ],
};
