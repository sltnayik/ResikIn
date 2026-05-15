import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_LOGIN_PATH, ROLE_DASHBOARD_PATHS } from "@/lib/auth/constants";

export async function getCurrentUserProfile() {
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || !userId) {
    return { supabase, user: null, profile: null };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id,nama_lengkap,email,role,created_at")
    .eq("id", userId)
    .single();

  if (profileError) {
    return {
      supabase,
      user: {
        id: userId,
        email: claimsData.claims.email,
      },
      profile: null,
    };
  }

  return {
    supabase,
    user: {
      id: userId,
      email: claimsData.claims.email,
    },
    profile,
  };
}

export async function requireRole(role) {
  const context = await getCurrentUserProfile();

  if (!context.user || !context.profile) {
    redirect(DEFAULT_LOGIN_PATH);
  }

  if (context.profile.role !== role) {
    redirect("/unauthorized");
  }

  return context;
}

export function getDashboardPath(role) {
  return ROLE_DASHBOARD_PATHS[role] || DEFAULT_LOGIN_PATH;
}
