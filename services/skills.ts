import { prisma } from "@/lib/prisma";
import type { SkillInput } from "@/lib/validations/skills";

export async function getSkills() {
  return prisma.skill.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function createSkill(data: SkillInput) {
  return prisma.skill.create({ data });
}

export async function updateSkill(id: string, data: SkillInput) {
  return prisma.skill.update({
    where: { id },
    data,
  });
}

export async function deleteSkill(id: string) {
  return prisma.skill.delete({
    where: { id },
  });
}
