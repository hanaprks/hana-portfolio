"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/lib/validations/auth";
import { AuthError } from "next-auth";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Server-side Zod validation
  const validated = loginSchema.safeParse({ email, password });

  if (!validated.success) {
    throw new Error(validated.error.issues[0].message);
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: "/admin/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          throw new Error("Email atau password salah.");
        default:
          throw new Error("Gagal melakukan autentikasi.");
      }
    }
    throw error; // Required to trigger redirect correctly
  }
}