"use server";

import { auth } from "@/auth";
import { certificateSchema } from "@/lib/validations/certificates";
import { createCertificate } from "@/services/certificates";

export async function addCertificateAction(formData: FormData) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    issueDate: formData.get("issueDate"),
    credentialId: formData.get("credentialId"),
    credentialUrl: formData.get("credentialUrl"),
  };

  const validated = certificateSchema.safeParse(rawData);
  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  await createCertificate(validated.data);
  return { success: true };
}
