import { z } from "zod";

export const SaleSchema = z.object({
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
  title: z.string(),
  slug: z.string(),
  description: z.string(),
});

export type CategoryType = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  label: z.string().optional(),
  price: z.number().optional(),
  categories: z.array(z.string()).optional(),
  stock: z.number().optional(),
  status: z.enum(["Hot", "New", "Sale"]).nullable().optional(),
});

export type ProductType = z.infer<typeof productSchema>;
