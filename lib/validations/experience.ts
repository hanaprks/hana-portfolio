import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(2, "Nama perusahaan minimal 2 karakter"),
  role: z.string().min(2, "Nama role minimal 2 karakter"),
  startDate: z.string().min(4, "Tanggal mulai minimal 4 karakter"),
  endDate: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;
