import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const url = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // 1. Handle Authentication for Admin routes
  const isAdminRoute = url.pathname.startsWith("/admin");
  const isAuthRoute = url.pathname.startsWith("/auth");

  if (isAdminRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 2. Handle Subdomain Routing (Existing logic)
  const hostname = req.headers.get("host") || "";
  const allowedDomains = ["localhost:3000", "shopify-clone.vercel.app"];
  const isAllowedDomain = allowedDomains.some((domain) => hostname === domain);
  const subdomain = hostname.split(".")[0];

  if (!isAllowedDomain && subdomain && hostname.includes(".")) {
    return NextResponse.rewrite(new URL(`/store/${subdomain}${url.pathname}`, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
