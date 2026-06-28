import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(2, "Nama skill minimal 2 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  level: z.coerce
    .number()
    .int()
    .min(0, "Level minimal 0")
    .max(100, "Level maksimal 100"),
  icon: z.string().optional().or(z.literal("")),
  sortOrder: z.coerce.number().int().default(0),
});

export type SkillSchemaInput = z.infer<typeof skillSchema>;
