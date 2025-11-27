"use client";

import { ErrorState } from "@/components/global/error-state";
import { LoadingState } from "@/components/global/loading-state";

export const HomeView = () => {
  return <div>home-view</div>;
};

export const HomeViewLoading = () => {
  return (
    <LoadingState
      title="Load Home page"
      description="This is take a few seconds"
    />
  );
};

export const HomeViewError = () => {
  return (
    <ErrorState
      title="Error loading Home page"
      description="This may be a temporary issue, please try again later."
    />
  );
};
