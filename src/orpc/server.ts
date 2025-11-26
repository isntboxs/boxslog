import "server-only";

import { createRouterClient } from "@orpc/server";

import { cache } from "react";
import { headers } from "next/headers";

import { createORPCContext } from "@/orpc";
import { appRouter } from "@/orpc/routers";

/**
 * This wraps the `createORPCContext` helper and provides the required context for the oRPC API when
 * handling a oRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-orpc-source", "rsc");

  return createORPCContext({
    headers: heads,
  });
});

/**
 * This is part of the Optimize SSR setup.
 *
 * @see {@link https://orpc.unnoq.com/docs/adapters/next#optimize-ssr}
 */
globalThis.$client = createRouterClient(appRouter, {
  /**
   * Provide initial context if needed.
   *
   * Because this client instance is shared across all requests,
   * only include context that's safe to reuse globally.
   * For per-request context, use middleware context or pass a function as the initial context.
   */
  context: createContext,
});
