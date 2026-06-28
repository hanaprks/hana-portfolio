import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  phone: z.string().optional().or(z.literal("")),
  whatsapp: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
