import { z } from "zod";

export const aboutSchema = z.object({
  title: z.string().min(3, "Title minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  education: z.string().optional().or(z.literal("")),
  currentFocus: z.string().optional().or(z.literal("")),
});

export type AboutInput = z.infer<typeof aboutSchema>;
