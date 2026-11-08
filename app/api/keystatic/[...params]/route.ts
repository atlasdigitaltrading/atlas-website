import { makeRouteHandler } from "@keystatic/next/route-handler";
import keystaticConfig from "../../../../keystatic.config";

export const runtime = "nodejs";

// See app/keystatic/[[...params]]/page.tsx: the CMS is local-only.
const handlers = makeRouteHandler({ config: keystaticConfig });
const gone = async () => new Response(null, { status: 404 });

export const GET: typeof handlers.GET = (...args) =>
  process.env.VERCEL ? gone() : handlers.GET(...args);
export const POST: typeof handlers.POST = (...args) =>
  process.env.VERCEL ? gone() : handlers.POST(...args);
