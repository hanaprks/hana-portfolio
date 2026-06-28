import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(2, "Nama skill minimal 2 karakter"),
  category: z.string().min(2, "Kategori minimal 2 karakter"),
  level: z.coerce.number().int().min(1, "Level minimal 1").max(100, "Level maksimal 100"),
  icon: z.string().optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().default(0),
});

export type SkillInput = z.infer<typeof skillSchema>;
