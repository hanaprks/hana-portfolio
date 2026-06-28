import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin123!", 12);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@hana.dev",
    },
    update: {},
    create: {
      name: "Hana Prakasita",
      email: "admin@hana.dev",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin berhasil dibuat:");
  console.log(admin);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });