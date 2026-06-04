import { NextResponse, type NextRequest } from "next/server";
import { maintenanceHtml } from "./lib/maintenance";

// Maintenance wall.
//
// Active by default once this is deployed. Lift it WITHOUT a code change or
// redeploy of logic by setting `MAINTENANCE_MODE=off` in the environment
// (Vercel project env var), then redeploy / restart.
const MAINTENANCE_OFF = process.env.MAINTENANCE_MODE === "off";

// Paths that must keep working even while the public site is gated.
// `/auth/callback` is the load-bearing multi-tenant studio auth router shared
// across the platform (studio password resets) — never gate it. `/api/*` stays
// open so server-side integrations and form endpoints keep functioning.
const ALLOWLIST = ["/auth", "/api"];

export function middleware(request: NextRequest) {
  if (MAINTENANCE_OFF) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (
    ALLOWLIST.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  ) {
    return NextResponse.next();
  }

  return new NextResponse(maintenanceHtml, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Temporary downtime: tell crawlers to retry rather than deindex.
      "Retry-After": "3600",
      // Never let a CDN/browser cache the wall and strand users after lift.
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

export const config = {
  // Run on every request except Next internals and static files (anything with
  // a file extension, e.g. /brand/*.svg, robots.txt, sitemap.xml).
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.[\\w]+$).*)",
  ],
};
