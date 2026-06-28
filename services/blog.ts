import { prisma } from "@/lib/prisma";
import type { BlogInput } from "@/lib/validations/blog";

// Placeholder methods until the 'Blog' model is added to schema.prisma
export async function getBlogs() {
  return [];
}

export async function createBlog(data: BlogInput) {
  return null;
}
