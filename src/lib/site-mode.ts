/**
 * TEMPORARY SITE MODE
 * ------------------------------------------------------------------
 * While we finish new features, every public marketing route renders
 * the holding page in src/components/site/ComingSoon.tsx.
 * Studio (the member tool) stays fully available.
 *
 * To bring the full website back: set SITE_MAINTENANCE to false.
 * Nothing else needs to change — all routes are untouched.
 */
export const SITE_MAINTENANCE = true;

const ALWAYS_ON_PREFIXES = [
  "/studio",
  "/reset-password",
  "/api",
  "/mcp",
  "/.well-known",
  "/.lovable",
  "/.mcp",
  "/lovable",
  "/email/unsubscribe",
];

export function isAlwaysOnPath(pathname: string) {
  return ALWAYS_ON_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
