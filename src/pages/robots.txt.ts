import type { APIRoute } from "astro";

/**
 * Generated rather than static, so the sitemap URL follows `site` in
 * astro.config.mjs instead of being hardcoded to one deployment.
 *
 * Preview and proposal deployments disallow everything: they carry the
 * brand's content but are not the brand's site, and must not compete with it
 * in an index.
 */
const isProduction =
  !import.meta.env.VERCEL_ENV || import.meta.env.VERCEL_ENV === "production";

export const GET: APIRoute = ({ site }) =>
  new Response(
    isProduction
      ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site).href}\n`
      : `User-agent: *\nDisallow: /\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
