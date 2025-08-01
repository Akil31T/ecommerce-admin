import { z } from "zod";

export const productValidationSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(10, "Description should be at least 10 characters"),
    price: z
        .string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val > 0, {
            message: "Price must be a valid number greater than 0",
        }),

    stock: z
        .string()
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val >= 0, {
            message: "Stock must be a valid number and at least 0",
        }),

    category: z.string().min(1, "Category is required"),
    status: z.string().min(1, "status is required"),

    tags: z
        .array(z.string().min(1, "Tag cannot be empty"))
        .min(1, "At least one tag is required"),
    image: z
        .string()
        .url("Must be a valid image URL")
        .optional(),
});
