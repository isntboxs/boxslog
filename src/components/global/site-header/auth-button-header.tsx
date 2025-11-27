import Link from "next/link";

import { Button } from "@/components/ui/button";

export const AuthButtonHeader = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>

      <Button variant="default" size="sm" asChild>
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </div>
  );
};
