import { z } from "zod";

export const productValidationSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  price: z
    .string().optional(),
  stock: z
    .string()
    .optional(),
  inStock: z.boolean().optional(),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["active", "inactive"]),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .optional(),
//  image: z.instanceof(File),
});
