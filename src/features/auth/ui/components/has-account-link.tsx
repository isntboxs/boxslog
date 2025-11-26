"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { SIGN_IN_FORM, SIGN_UP_FORM } from "@/features/auth/constants";
import { getCallbackUrl } from "@/utils/get-callback-url";

type Props = {
  type: "sign-in" | "sign-up";
};

export const HasAccountLink = ({ type }: Props) => {
  const params = useSearchParams();

  return (
    <div className="text-muted-foreground mt-4 text-center text-sm">
      {type === "sign-in" ? SIGN_IN_FORM.footerText : SIGN_UP_FORM.footerText}{" "}
      <Button variant="link" size="sm" className="p-0" asChild>
        <Link
          href={
            type === "sign-in"
              ? `/sign-up?callbackUrl=${encodeURIComponent(getCallbackUrl(params))}`
              : `/sign-in?callbackUrl=${encodeURIComponent(getCallbackUrl(params))}`
          }
        >
          {type === "sign-in" ? "Sign Up" : "Sign In"}
        </Link>
      </Button>
    </div>
  );
};
