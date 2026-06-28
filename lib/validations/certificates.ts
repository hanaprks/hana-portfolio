import { z } from "zod";

export const certificateSchema = z.object({
  title: z.string().min(3, "Judul sertifikat minimal 3 karakter"),
  issuer: z.string().min(2, "Nama penerbit minimal 2 karakter"),
  issueDate: z.string().optional().or(z.literal("")),
  credentialId: z.string().optional().or(z.literal("")),
  credentialUrl: z.string().url("Format URL kredensial tidak valid").optional().or(z.literal("")),
});

export type CertificateInput = z.infer<typeof certificateSchema>;
