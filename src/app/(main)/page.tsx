import { ErrorBoundary } from "react-error-boundary";

import { Suspense } from "react";

import {
  HomeView,
  HomeViewError,
  HomeViewLoading,
} from "@/features/home/ui/views/home-view";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HomeViewLoading />}>
        <ErrorBoundary fallback={<HomeViewError />}>
          <HomeView />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
