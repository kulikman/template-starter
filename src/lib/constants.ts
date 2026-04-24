export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Template Starter";

/**
 * Canonical route map.
 *
 * Rules:
 *   - Every nested route must have a navigable parent (no dead intermediate URLs).
 *   - Use descriptive nouns as segments, not abbreviations or numeric IDs alone.
 *   - Dynamic segments: `/projects/[id]`, never `/p/[id]`.
 *   - Add new routes here and in `SEGMENT_LABELS` (breadcrumbs.tsx).
 */
export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/signup",
  dashboard: "/dashboard",
  settings: "/dashboard/settings",
  profile: "/dashboard/profile",
  billing: "/dashboard/billing",
} as const;
