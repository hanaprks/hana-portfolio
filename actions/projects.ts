"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { projectSchema } from "@/lib/validations/projects";
import { createProject, updateProject, deleteProject } from "@/services/projects";

export async function addProjectAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    thumbnail: formData.get("thumbnail"),
    github: formData.get("github"),
    demo: formData.get("demo"),
    techStack: formData.get("techStack"),
    featured: formData.get("featured") === "true",
    status: formData.get("status"),
  };

  const validated = projectSchema.safeParse(rawData);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  await createProject(validated.data);

  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

export async function editProjectAction(id: string, formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    thumbnail: formData.get("thumbnail"),
    github: formData.get("github"),
    demo: formData.get("demo"),
    techStack: formData.get("techStack"),
    featured: formData.get("featured") === "true",
    status: formData.get("status"),
  };

  const validated = projectSchema.safeParse(rawData);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  await updateProject(id, validated.data);

  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}

export async function removeProjectAction(id: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await deleteProject(id);

  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { success: true };
}
