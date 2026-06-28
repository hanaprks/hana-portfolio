import { prisma } from "@/lib/prisma";
import type { AboutInput } from "@/lib/validations/about";

export async function getAbout() {
  return prisma.about.findFirst();
}

export async function updateAbout(data: AboutInput) {
  const existing = await prisma.about.findFirst();
  if (existing) {
    return prisma.about.update({
      where: { id: existing.id },
      data,
    });
  }
  return prisma.about.create({
    data,
  });
}
