import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { USER_ROLES } from "@/lib/auth/constants";
import { getSupabaseConfig } from "@/lib/supabase/config";

const protectedRoutes = [
  { prefix: "/officer/dashboard", role: USER_ROLES.PETUGAS },
  { prefix: "/officer/reports", role: USER_ROLES.PETUGAS },
  { prefix: "/user/dashboard", role: USER_ROLES.MASYARAKAT },
  { prefix: "/user/history", role: USER_ROLES.MASYARAKAT },
  { prefix: "/user/report", role: USER_ROLES.MASYARAKAT },
];

const authRoutes = new Set(["/login", "/user/login", "/officer/login", "/user/register"]);

function getProtectedRoute(pathname) {
  return protectedRoutes.find((route) => pathname.startsWith(route.prefix));
}

function getAuthCookieNames(request) {
  return request.cookies
    .getAll()
    .map((cookie) => cookie.name)
    .filter((name) => name.startsWith("sb-") && name.includes("-auth-token"));
}

function redirectWithClearedAuthCookies(request, pathname) {
  const redirectUrl = new URL(pathname, request.url);
  const response = NextResponse.redirect(redirectUrl);

  getAuthCookieNames(request).forEach((name) => {
    response.cookies.delete(name);
  });

  return response;
}

async function getProfileRole(supabase, userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (error) return null;

  return data?.role || null;
}

function applyCacheHeaders(response, headers = {}) {
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
}

export async function updateSession(request) {
  let response = NextResponse.next({
    request,
  });

  const { url, key } = getSupabaseConfig();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });

        applyCacheHeaders(response, headers);
      },
    },
  });

  const pathname = request.nextUrl.pathname;
  const protectedRoute = getProtectedRoute(pathname);
  const shouldResolveUser = protectedRoute || authRoutes.has(pathname);

  if (!shouldResolveUser) {
    return response;
  }

  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || !userId) {
    if (!protectedRoute) {
      return response;
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    const redirectResponse = redirectWithClearedAuthCookies(request, loginUrl.pathname);
    redirectResponse.headers.set("Location", loginUrl.toString());
    return redirectResponse;
  }

  const role = await getProfileRole(supabase, userId);

  if (!role) {
    return redirectWithClearedAuthCookies(request, "/login");
  }

  if (authRoutes.has(pathname)) {
    const dashboardPath = role === USER_ROLES.PETUGAS ? "/officer/dashboard" : "/user/dashboard";
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  if (protectedRoute && role !== protectedRoute.role) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return response;
}
