import { prisma } from "@/lib/prisma";
import type { CertificateInput } from "@/lib/validations/certificates";

// Placeholder methods until the 'Certificate' model is added to schema.prisma
export async function getCertificates() {
  return [];
}

export async function createCertificate(data: CertificateInput) {
  return null;
}
