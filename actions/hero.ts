"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { heroSchema } from "@/lib/validations/hero";
import { updateHero } from "@/services/hero";

export async function saveHeroAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    headline: formData.get("headline"),
    subHeadline: formData.get("subHeadline"),
    role: formData.get("role"),
    profileImage: formData.get("profileImage"),
    cvUrl: formData.get("cvUrl"),
    availability: formData.get("availability"),
    location: formData.get("location"),
    yearsExperience: formData.get("yearsExperience"),
    projectCompleted: formData.get("projectCompleted"),
  };

  const validated = heroSchema.safeParse(rawData);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  await updateHero(validated.data);

  revalidatePath("/admin/hero");
  revalidatePath("/");
  return { success: true };
}
