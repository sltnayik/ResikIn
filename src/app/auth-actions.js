"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DUMMY_ACCOUNTS } from "@/lib/auth-config";
import { loginSchema } from "@/lib/validation";

const SESSION_COOKIE = "session";
const ROLE_COOKIE = "role";

export async function loginAction(_previousState, formData) {
  const validation = loginSchema.safeParse({
    role: formData.get("role"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validation.success) {
    return {
      success: false,
      message: "Periksa kembali data login.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { role, email, password } = validation.data;
  const account = DUMMY_ACCOUNTS[role];

  if (email !== account.email || password !== account.password) {
    return {
      success: false,
      message: "Email atau password tidak sesuai dengan akun dummy.",
      errors: {
        email: ["Gunakan email dummy yang sesuai role."],
        password: ["Gunakan password dummy yang sesuai role."],
      },
    };
  }

  const cookieStore = await cookies();
  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 2,
  };

  cookieStore.set(SESSION_COOKIE, "active", cookieOptions);
  cookieStore.set(ROLE_COOKIE, role, cookieOptions);

  redirect(account.redirectPath);
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
  cookieStore.delete(ROLE_COOKIE);

  redirect("/login");
}
