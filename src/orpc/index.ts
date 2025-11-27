import { ORPCError, os } from "@orpc/server";

import { env } from "@/config/env";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const createORPCContext = async (opts: { headers: Headers }) => {
  const session = await auth.api.getSession({
    headers: opts.headers,
  });

  return {
    db,
    session,
    ...opts,
  };
};

export const o = os.$context<Awaited<ReturnType<typeof createORPCContext>>>();

/**
 * Timing middleware
 */
const timingMiddleware = o.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (env.NODE_ENV === "development") {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();
  const end = Date.now();
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log(`[ORPC] ${path} took ${end - start}ms to execute`);

  return result;
});

const requireAuth = o.middleware(async ({ context, next }) => {
  if (!context.session) {
    throw new ORPCError("UNAUTHORIZED", {
      cause: "Unauthorized",
      message: "You must be authenticated to perform this action",
    });
  }

  return next({
    context: {
      ...context,
      auth: {
        session: context.session.session,
        user: context.session.user,
      },
    },
  });
});

// Public procedure (unauthenticated)
export const publicProcedure = o.use(timingMiddleware);

// Protected procedure (authenticated)
export const protectedProcedure = o.use(timingMiddleware).use(requireAuth);
