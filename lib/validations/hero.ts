import { z } from "zod";

export const heroSchema = z.object({
  headline: z.string().min(3, "Headline minimal 3 karakter"),
  subHeadline: z.string().min(3, "Subheadline minimal 3 karakter"),
  role: z.string().min(2, "Role minimal 2 karakter"),
  profileImage: z.string().url("Format URL gambar tidak valid").optional().or(z.literal("")),
  cvUrl: z.string().url("Format URL CV tidak valid").optional().or(z.literal("")),
  availability: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  yearsExperience: z.coerce.number().int().nonnegative("Tahun pengalaman harus bernilai positif"),
  projectCompleted: z.coerce.number().int().nonnegative("Jumlah project selesai harus bernilai positif"),
});

export type HeroInput = z.infer<typeof heroSchema>;
