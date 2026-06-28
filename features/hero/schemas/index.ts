import { z } from "zod";

export const heroSchema = z.object({
  headline: z.string().min(1, "Headline wajib diisi"),
  subHeadline: z.string().min(1, "Subheadline wajib diisi"),
  role: z.string().min(1, "Role wajib diisi"),
  location: z.string().optional().or(z.literal("")),
  availability: z.string().optional().or(z.literal("")),
  yearsExperience: z.coerce
    .number()
    .int()
    .nonnegative("Years Experience harus >= 0"),
  projectCompleted: z.coerce
    .number()
    .int()
    .nonnegative("Projects Completed harus >= 0"),
  github: z.string().url("Format URL Github tidak valid").optional().or(z.literal("")),
  linkedIn: z.string().url("Format URL LinkedIn tidak valid").optional().or(z.literal("")),
  instagram: z.string().url("Format URL Instagram tidak valid").optional().or(z.literal("")),
  email: z.string().email("Format email tidak valid").optional().or(z.literal("")),
  profileImage: z.string().optional().or(z.literal("")),
  cvUrl: z.string().optional().or(z.literal("")),
});

export type HeroSchemaInput = z.infer<typeof heroSchema>;
