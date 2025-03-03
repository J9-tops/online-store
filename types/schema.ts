import { z } from "zod";

export const SaleSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  discountBadge: z.string().optional(),
  discountAmount: z.number().optional(),
  couponCode: z.string().optional(),
  validFrom: z.date().optional(),
  validUntil: z.date().optional(),
  isActive: z.boolean().default(true).optional(),
  imageUrl: z.string().optional(),
});

export const categorySchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
});

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
