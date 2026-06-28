import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, "Title minimal 3 karakter"),
  slug: z.string().min(2, "Slug minimal 2 karakter").regex(/^[a-z0-9-]+$/, "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  thumbnail: z.string().optional().or(z.literal("")),
  github: z.string().url("Format URL GitHub tidak valid").optional().or(z.literal("")),
  demo: z.string().url("Format Live Demo URL tidak valid").optional().or(z.literal("")),
  figma: z.string().url("Format Figma URL tidak valid").optional().or(z.literal("")),
  techStack: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  gallery: z.array(z.string()).default([]),
});

export type ProjectSchemaInput = z.infer<typeof projectSchema>;
