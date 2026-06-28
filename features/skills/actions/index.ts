"use server";

import { prisma } from "@/lib/prisma";
import { skillSchema, type SkillSchemaInput } from "../schemas";
import { revalidatePath } from "next/cache";

export async function getSkills() {
  return await prisma.skill.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });
}

export async function createSkill(data: SkillSchemaInput) {
  const validated = skillSchema.parse(data);

  if (!validated.sortOrder) {
    const maxSortSkill = await prisma.skill.findFirst({
      orderBy: {
        sortOrder: "desc",
      },
      select: {
        sortOrder: true,
      },
    });

    validated.sortOrder = (maxSortSkill?.sortOrder ?? 0) + 1;
  }

  const created = await prisma.skill.create({
    data: validated,
  });

  revalidatePath("/admin/skills");
  revalidatePath("/");

  return {
    success: true,
    data: JSON.parse(JSON.stringify(created)),
  };
}

export async function updateSkill(
  id: string,
  data: SkillSchemaInput
) {
  const validated = skillSchema.parse(data);

  const updated = await prisma.skill.update({
    where: {
      id,
    },
    data: validated,
  });

  revalidatePath("/admin/skills");
  revalidatePath("/");

  return {
    success: true,
    data: JSON.parse(JSON.stringify(updated)),
  };
}

export async function deleteSkill(id: string) {
  const deleted = await prisma.skill.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/skills");
  revalidatePath("/");

  return {
    success: true,
    data: JSON.parse(JSON.stringify(deleted)),
  };
}

export async function updateSkillsOrder(
  idOrders: {
    id: string;
    sortOrder: number;
  }[]
) {
  await prisma.$transaction(
    idOrders.map(({ id, sortOrder }) =>
      prisma.skill.update({
        where: {
          id,
        },
        data: {
          sortOrder,
        },
      })
    )
  );

  revalidatePath("/admin/skills");
  revalidatePath("/");

  return {
    success: true,
  };
}