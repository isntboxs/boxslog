import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import type { QueryClient } from "@tanstack/react-query";

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
