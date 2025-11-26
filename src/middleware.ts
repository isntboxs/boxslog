import { headers } from "next/headers";
import { NextResponse } from "next/server";

import {
  AUTH_PATH_PREFIXES,
  DEFAULT_AFTER_SIGN_IN_PATH,
  PROTECTED_PATH_PREFIXES,
} from "@/constants";
import { auth } from "@/lib/auth";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const isAuthRoute = AUTH_PATH_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isProtectedRoute = PROTECTED_PATH_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect to default after sign in page, if user has session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL(DEFAULT_AFTER_SIGN_IN_PATH, req.url));
  }

  // Redirect to sign in page (with callback url if it's a protected route), if user doesn't have session
  if (isProtectedRoute && !session) {
    let callbackUrl = pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    const signInWithCallbackUrl = `/sign-in?callbackUrl=${encodedCallbackUrl}`;

    return NextResponse.redirect(new URL(signInWithCallbackUrl, req.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  // Match all routes except for static files and Next.js internal routes
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc|rpc|orpc)(.*)"],
};
