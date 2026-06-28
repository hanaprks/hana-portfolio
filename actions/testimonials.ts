"use server";

import { auth } from "@/auth";
import { testimonialSchema } from "@/lib/validations/testimonials";
import { createTestimonial } from "@/services/testimonials";

export async function addTestimonialAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    name: formData.get("name"),
    role: formData.get("role"),
    company: formData.get("company"),
    message: formData.get("message"),
    avatarUrl: formData.get("avatarUrl"),
  };

  const validated = testimonialSchema.safeParse(rawData);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  await createTestimonial(validated.data);
  return { success: true };
}
