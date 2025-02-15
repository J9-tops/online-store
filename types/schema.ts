import { z } from "zod";

export const SaleSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  badge: z.string().optional(),
  discountAmount: z.string().optional(),
  couponCode: z.string().optional(),
  validFrom: z.date().optional(),
  validUntil: z.date().optional(),
  isActive: z.boolean().default(true).optional(),
});

export const categorySchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
});
