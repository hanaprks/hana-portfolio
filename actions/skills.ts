"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { skillSchema } from "@/lib/validations/skills";
import { createSkill, updateSkill, deleteSkill } from "@/services/skills";

export async function addSkillAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    name: formData.get("name"),
    category: formData.get("category"),
    level: formData.get("level"),
    icon: formData.get("icon"),
    sortOrder: formData.get("sortOrder"),
  };

  const validated = skillSchema.safeParse(rawData);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  await createSkill(validated.data);

  revalidatePath("/admin/skills");
  revalidatePath("/");
  return { success: true };
}

export async function editSkillAction(id: string, formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    name: formData.get("name"),
    category: formData.get("category"),
    level: formData.get("level"),
    icon: formData.get("icon"),
    sortOrder: formData.get("sortOrder"),
  };

  const validated = skillSchema.safeParse(rawData);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  await updateSkill(id, validated.data);

  revalidatePath("/admin/skills");
  revalidatePath("/");
  return { success: true };
}

export async function removeSkillAction(id: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await deleteSkill(id);

  revalidatePath("/admin/skills");
  revalidatePath("/");
  return { success: true };
}
