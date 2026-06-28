"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { aboutSchema } from "@/lib/validations/about";
import { updateAbout } from "@/services/about";

export async function saveAboutAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    education: formData.get("education"),
    currentFocus: formData.get("currentFocus"),
  };

  const validated = aboutSchema.safeParse(rawData);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  await updateAbout(validated.data);

  revalidatePath("/admin/about");
  revalidatePath("/");
  return { success: true };
}
