"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { blogSchema } from "@/lib/validations/blog";
import { createBlog } from "@/services/blog";

export async function addBlogAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage"),
    published: formData.get("published") === "true",
  };

  const validated = blogSchema.safeParse(rawData);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  await createBlog(validated.data);

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}
