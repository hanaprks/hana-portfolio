"use server";

import { prisma } from "@/lib/prisma";
import { heroSchema, type HeroSchemaInput } from "../schemas";
import { revalidatePath } from "next/cache";

export async function getHero() {
  try {
    const hero = await prisma.hero.findFirst();
    return hero;
  } catch (error) {
    console.error("Error getting hero:", error);
    throw new Error("Failed to retrieve Hero data");
  }
}

export async function updateHero(data: HeroSchemaInput) {
  try {
    const validated = heroSchema.parse(data);

    const existing = await prisma.hero.findFirst();
    let updated;
    if (existing) {
      updated = await prisma.hero.update({
        where: { id: existing.id },
        data: validated,
      });
    } else {
      updated = await prisma.hero.create({
        data: validated,
      });
    }
    
    revalidatePath("/admin/hero");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    
    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating hero:", error);
    const errMessage = error instanceof Error ? error.message : "Failed to save Hero data";
    return { success: false, error: errMessage };
  }
}
