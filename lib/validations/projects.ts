import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Judul project minimal 3 karakter"),
  slug: z.string().min(3, "Slug minimal 3 karakter").regex(/^[a-z0-9-]+$/, "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  thumbnail: z.string().url("Format URL gambar tidak valid").optional().or(z.literal("")),
  github: z.string().url("Format URL GitHub tidak valid").optional().or(z.literal("")),
  demo: z.string().url("Format URL Live Demo tidak valid").optional().or(z.literal("")),
  techStack: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export type ProjectInput = z.infer<typeof projectSchema>;
