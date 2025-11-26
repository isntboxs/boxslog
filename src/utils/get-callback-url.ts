import { PROTECTED_PATH_PREFIXES } from "@/constants";

import type { ReadonlyURLSearchParams } from "next/navigation";

const allowedCallbackSet: ReadonlySet<string> = new Set(
  PROTECTED_PATH_PREFIXES
);

export const getCallbackUrl = (
  queryParams: ReadonlyURLSearchParams
): string => {
  const callbackUrl = queryParams.get("callbackUrl");

  if (callbackUrl) {
    if (allowedCallbackSet.has(callbackUrl)) {
      return callbackUrl;
    }

    return "/";
  }

  return "/";
};
