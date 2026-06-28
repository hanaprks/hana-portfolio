"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { contactSchema } from "@/lib/validations/contact";
import { updateContact } from "@/services/contact";

export async function saveContactAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    email: formData.get("email"),
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
    address: formData.get("address"),
  };

  const validated = contactSchema.safeParse(rawData);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  await updateContact(validated.data);

  revalidatePath("/admin/contact");
  revalidatePath("/");
  return { success: true };
}
