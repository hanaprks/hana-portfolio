import { prisma } from "@/lib/prisma";
import type { ContactInput } from "@/lib/validations/contact";

export async function getContact() {
  return prisma.contact.findFirst();
}

export async function updateContact(data: ContactInput) {
  const existing = await prisma.contact.findFirst();
  if (existing) {
    return prisma.contact.update({
      where: { id: existing.id },
      data,
    });
  }
  return prisma.contact.create({
    data,
  });
}
