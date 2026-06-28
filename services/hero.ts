import { prisma } from "@/lib/prisma";
import type { HeroInput } from "@/lib/validations/hero";

export async function getHero() {
  return prisma.hero.findFirst();
}

export async function updateHero(data: HeroInput) {
  const existing = await prisma.hero.findFirst();
  if (existing) {
    return prisma.hero.update({
      where: { id: existing.id },
      data,
    });
  }
  return prisma.hero.create({
    data,
  });
}
