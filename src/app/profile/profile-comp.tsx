"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { orpc } from "@/orpc/client";

export const ProfileComp = () => {
  const { data } = useSuspenseQuery(orpc.privateData.queryOptions());
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
