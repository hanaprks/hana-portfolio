import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  role: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Pesan testimonial minimal 10 karakter"),
  avatarUrl: z.string().url("Format URL avatar tidak valid").optional().or(z.literal("")),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
