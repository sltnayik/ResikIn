"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAuthErrorMessage } from "@/lib/auth/errors";
import { getDashboardPath } from "@/lib/auth/session";
import { loginSchema, registerSchema } from "@/lib/validation";

const failedState = (message, errors = {}) => ({
  success: false,
  message,
  errors,
});

export async function loginAction(_previousState, formData) {
  const validation = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validation.success) {
    return failedState("Periksa kembali data login.", validation.error.flatten().fieldErrors);
  }

  const supabase = await createClient();
  const { email, password } = validation.data;
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    return failedState(getAuthErrorMessage(loginError), {
      email: ["Pastikan email terdaftar."],
      password: ["Pastikan password benar."],
    });
  }

  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || !userId) {
    await supabase.auth.signOut();
    return failedState("Session login tidak valid. Silakan coba lagi.");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError || !profile?.role) {
    await supabase.auth.signOut();
    return failedState("Profil akun belum tersedia. Hubungi admin.");
  }

  redirect(getDashboardPath(profile.role));
}

export async function registerAction(_previousState, formData) {
  const validation = registerSchema.safeParse({
    nama_lengkap: formData.get("nama_lengkap"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validation.success) {
    return failedState("Periksa kembali data registrasi.", validation.error.flatten().fieldErrors);
  }

  const supabase = await createClient();
  const { nama_lengkap, email, password } = validation.data;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nama_lengkap,
      },
    },
  });

  if (error) {
    return failedState(getAuthErrorMessage(error), {
      email: error.message?.toLowerCase().includes("registered")
        ? ["Email sudah digunakan."]
        : undefined,
      password: error.message?.toLowerCase().includes("password")
        ? ["Gunakan password yang lebih kuat."]
        : undefined,
    });
  }

  if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    await supabase.auth.signOut();
    return failedState("Email sudah digunakan. Silakan login atau gunakan email lain.", {
      email: ["Email sudah digunakan."],
    });
  }

  await supabase.auth.signOut();
  redirect("/user/login?registered=1");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
