"use server";

import { auth } from "@/auth";
import { experienceSchema } from "@/lib/validations/experience";
import { createExperience } from "@/services/experience";

export async function addExperienceAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    company: formData.get("company"),
    role: formData.get("role"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    description: formData.get("description"),
  };

  const validated = experienceSchema.safeParse(rawData);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  await createExperience(validated.data);
  return { success: true };
}
