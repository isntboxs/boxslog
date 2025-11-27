import { ErrorBoundary } from "react-error-boundary";

import { Suspense } from "react";

import { ProfileComp } from "@/app/profile/profile-comp";
import { HydrateClient } from "@/components/global/hydration";
import { orpc } from "@/orpc/client";
import { getQueryClient } from "@/orpc/server";

export default function ProfilePage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(orpc.privateData.queryOptions());

  return (
    <HydrateClient client={queryClient}>
      <Suspense fallback={<p>Loading...</p>}>
        <ErrorBoundary fallback={<p>Something went wrong.</p>}>
          <ProfileComp />
        </ErrorBoundary>
      </Suspense>
    </HydrateClient>
  );
}
