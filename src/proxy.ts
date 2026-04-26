import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";
import { buildSecurityHeaders } from "@/lib/security-headers";

/**
 * Next.js 16 Proxy (replaces deprecated middleware.ts).
 *
 * Runs on the Node.js runtime before any route is rendered. Does two things:
 *   1. Refreshes the Supabase auth session cookie so server components see a
 *      valid user. Without this, sessions expire silently and RLS queries
 *      start failing in a hard-to-debug way.
 *   2. Attaches security headers (CSP, HSTS, X-Frame-Options, etc.) to every
 *      response. Centralized here so individual routes can't forget them.
 *
 * Do NOT do heavy auth logic here — that belongs in Server Components,
 * Server Actions, or Route Handlers via `supabase.auth.getUser()`.
 */
export async function proxy(request: NextRequest): Promise<NextResponse> {
  const response = await updateSession(request);
  const headers = buildSecurityHeaders({
    isDev: process.env.NODE_ENV !== "production",
  });

  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }

  return response;
}

export const config = {
  /**
   * Match everything except:
   *   - _next/static  (static assets, never need session refresh or CSP)
   *   - _next/image   (image optimization)
   *   - favicon.ico, sitemap.xml, robots.txt (public roots)
   *   - common file extensions (images, fonts)
   *
   * This matcher is recommended by @supabase/ssr. Adjust only if you know why.
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf)$).*)",
  ],
};
