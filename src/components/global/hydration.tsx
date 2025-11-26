import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { cache } from "react";

import { createQueryClient } from "@/lib/query-client";

import type { QueryClient } from "@tanstack/react-query";

export const getQueryClient = cache(createQueryClient);

export function HydrateClient(props: {
  children: React.ReactNode;
  client: QueryClient;
}) {
  return (
    <HydrationBoundary state={dehydrate(props.client)}>
      {props.children}
    </HydrationBoundary>
  );
}
