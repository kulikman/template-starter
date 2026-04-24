import { z } from "zod";

/**
 * Shared Zod schemas for forms, API request bodies, and query params.
 *
 * Add schemas here when they're used across multiple routes or components.
 * Keep route-specific schemas co-located with the route handler.
 */

/** Email validation — reused across login, signup, invite forms. */
export const emailSchema = z.string().email("Invalid email address");

/** Pagination query params — used by list API routes. */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

/** UUID param — used for dynamic route validation. */
export const uuidParamSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});
