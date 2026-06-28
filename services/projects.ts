import { prisma } from "@/lib/prisma";
import type { ProjectInput } from "@/lib/validations/projects";

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  });
}

export async function createProject(data: ProjectInput) {
  return prisma.project.create({ data });
}

export async function updateProject(id: string, data: ProjectInput) {
  return prisma.project.update({
    where: { id },
    data,
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  });
}
