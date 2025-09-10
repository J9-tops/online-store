import { z } from "zod";

export const SaleSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  discountBadge: z.string(),
  discountAmount: z.number(),
  couponCode: z.string(),
  validFrom: z.date(),
  validUntil: z.date(),
  isActive: z.boolean().default(true),
  imageUrl: z.string(),
});

export type SaleType = z.infer<typeof SaleSchema>;

export const categorySchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
});

export type CategoryType = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  label: z.string(),
  price: z.number(),
  categories: z.array(z.string()),
  stock: z.number(),
  status: z.enum(["Hot", "New", "Sale"]).nullable(),
});

export type ProductType = z.infer<typeof productSchema>;
