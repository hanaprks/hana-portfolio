"use server";

import { prisma } from "@/lib/prisma";
import { aboutSchema, type AboutSchemaInput } from "../schemas";
import { revalidatePath } from "next/cache";

export async function getAbout() {
  try {
    const about = await prisma.about.findFirst();
    return about;
  } catch (error) {
    console.error("Error getting about:", error);
    throw new Error("Failed to retrieve About data");
  }
}

export async function updateAbout(data: AboutSchemaInput) {
  try {
    const validated = aboutSchema.parse(data);

    const existing = await prisma.about.findFirst();
    let updated;
    if (existing) {
      updated = await prisma.about.update({
        where: { id: existing.id },
        data: validated,
      });
    } else {
      updated = await prisma.about.create({
        data: validated,
      });
    }

    revalidatePath("/admin/about");
    revalidatePath("/admin/dashboard");
    revalidatePath("/");

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating about:", error);
    const errMessage = error instanceof Error ? error.message : "Failed to save About data";
    return { success: false, error: errMessage };
  }
}
