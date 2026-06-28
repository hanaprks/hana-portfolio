import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(3, "Judul artikel minimal 3 karakter"),
  slug: z.string().min(3, "Slug minimal 3 karakter"),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  coverImage: z.string().url("Format URL gambar tidak valid").optional().or(z.literal("")),
  published: z.boolean().default(false),
});

export type BlogInput = z.infer<typeof blogSchema>;
