import { NextResponse } from "next/server";

const protectedRoutes = [
  {
    prefix: "/officer",
    role: "officer",
  },
  {
    prefix: "/user",
    role: "user",
  },
];

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;
  const role = request.cookies.get("role")?.value;
  const route = protectedRoutes.find((item) => pathname.startsWith(item.prefix));

  if (!route) {
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (role !== route.role) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/officer/dashboard/:path*",
    "/officer/reports/:path*",
    "/user/dashboard/:path*",
    "/user/history/:path*",
    "/user/report/:path*",
  ],
};
