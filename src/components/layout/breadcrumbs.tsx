"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { cn } from "@/lib/utils";

/**
 * Route segment → human-readable label map.
 *
 * Add entries here when creating new routes. Dynamic segments (e.g. `[slug]`)
 * are resolved at render time via the `resolveLabel` prop.
 */
const SEGMENT_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  settings: "Settings",
  docs: "Docs",
  blog: "Blog",
  admin: "Admin",
  profile: "Profile",
  billing: "Billing",
  team: "Team",
  projects: "Projects",
  analytics: "Analytics",
};

interface BreadcrumbsProps {
  /**
   * Resolve a dynamic segment (e.g. `[slug]`) to a readable label.
   * Called for every segment not found in SEGMENT_LABELS.
   * Return `null` to use the raw segment as-is.
   */
  resolveLabel?: (segment: string, segments: string[]) => string | null;
  /** Additional CSS classes on the outer `<nav>`. */
  className?: string;
  /** Override the home label. Default: "Home". */
  homeLabel?: string;
}

/**
 * Breadcrumb navigation that auto-generates from the current URL path.
 *
 * Renders: Home / Dashboard / Settings
 *
 * Usage:
 *   - Drop `<Breadcrumbs />` into any layout or page.
 *   - For dynamic routes, pass `resolveLabel` to map slugs to titles.
 *
 * @example
 *   // /docs/getting-started → Home / Docs / Getting Started
 *   <Breadcrumbs resolveLabel={(seg) => seg.replace(/-/g, " ")} />
 *
 * @example
 *   // /projects/abc123 → Home / Projects / My Project
 *   <Breadcrumbs resolveLabel={(seg) => projectMap[seg] ?? null} />
 */
export function Breadcrumbs({
  resolveLabel,
  className,
  homeLabel = "Home",
}: BreadcrumbsProps): React.ReactElement | null {
  const pathname = usePathname();

  // Don't render breadcrumbs on the home page
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  // Strip Next.js route groups like (auth), (dashboard)
  const visibleSegments = segments.filter((s) => !s.startsWith("("));

  if (visibleSegments.length === 0) return null;

  const crumbs = visibleSegments.map((segment, index) => {
    // Build the href from all segments up to and including this one,
    // but use the original `segments` array to preserve the real URL path
    const href = "/" + segments.slice(0, segments.indexOf(segment) + 1).join("/");

    const label =
      SEGMENT_LABELS[segment] ??
      resolveLabel?.(segment, visibleSegments) ??
      formatSegment(segment);

    const isLast = index === visibleSegments.length - 1;

    return { href, label, isLast };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("text-muted-foreground flex items-center gap-1.5 text-sm", className)}
    >
      <ol className="flex items-center gap-1.5">
        <li>
          <Link
            href="/"
            className="hover:text-foreground transition-colors"
          >
            {homeLabel}
          </Link>
        </li>
        {crumbs.map(({ href, label, isLast }) => (
          <Fragment key={href}>
            <li aria-hidden="true" className="text-muted-foreground/40 select-none">
              /
            </li>
            <li>
              {isLast ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-foreground transition-colors"
                >
                  {label}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Converts a URL segment to a human-readable label.
 * `getting-started` → `Getting Started`
 * UUIDs are left as-is (they should be resolved via `resolveLabel`).
 */
function formatSegment(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
