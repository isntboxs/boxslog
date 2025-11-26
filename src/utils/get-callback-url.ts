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
    // Validate the callbackUrl is a safe relative path:
    // - Must start with a single "/"
    // - Must not start with "//"
    // - Must not contain a scheme like "://"
    if (
      callbackUrl.startsWith("/") &&
      !callbackUrl.startsWith("//") &&
      !callbackUrl.includes("://")
    ) {
      // Check if it equals an allowed entry or has an allowed entry as a prefix
      for (const allowed of allowedCallbackSet) {
        if (callbackUrl === allowed || callbackUrl.startsWith(allowed + "/")) {
          return callbackUrl;
        }
      }
    }

    return "/";
  }

  return "/";
};
