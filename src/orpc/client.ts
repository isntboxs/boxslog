import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createRouterUtils } from "@orpc/tanstack-query";

import type { AppRouterClient } from "@/orpc/routers";

/**
 * This is part of the Optimize SSR setup.
 *
 * @see {@link https://orpc.unnoq.com/docs/adapters/next#optimize-ssr}
 */
declare global {
  var $client: AppRouterClient | undefined;
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const link = new RPCLink({
  url: getBaseUrl() + "/api/orpc",
  headers: async () => {
    // On the client we can't use `next/headers`, just send the custom header.
    if (typeof window !== "undefined") {
      const heads = new Headers();
      heads.set("x-orpc-source", "nextjs-react");
      return heads;
    }

    // On the server, forward the incoming request headers.
    const { headers } = await import("next/headers");
    const requestHeaders = await headers();
    const heads = new Headers(requestHeaders);
    heads.set("x-orpc-source", "nextjs-react");
    return heads;
  },
});

export const client: AppRouterClient =
  globalThis.$client ?? createORPCClient(link);

export const orpc = createRouterUtils(client);
