/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SIGN_IN_FORM } from "@/features/auth/constants";
import { AuthSignInForm } from "@/features/auth/ui/components/auth-sign-in-form";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div">;

export const SignInView = ({ className, ...props }: Props) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-semibold">{SIGN_IN_FORM.title}</h1>

                <p className="text-muted-foreground text-balance">
                  {SIGN_IN_FORM.description}
                </p>
              </div>

              <AuthSignInForm />
            </div>

            <div className="text-muted-foreground mt-4 text-center text-sm">
              {SIGN_IN_FORM.footerText}{" "}
              <Button variant="link" size="sm" className="p-0" asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          </div>

          <figure className="bg-muted relative hidden md:block">
            <img
              src="https://placehold.co/400x400"
              width={400}
              height={400}
              alt="Sign In Banner"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </figure>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs text-balance">
        By clicking continue, you agree to our{" "}
        <Button
          variant="link"
          size="sm"
          className="p-0 text-xs text-balance"
          asChild
        >
          <Link href="#">Terms of Service</Link>
        </Button>{" "}
        and{" "}
        <Button
          variant="link"
          size="sm"
          className="p-0 text-xs text-balance"
          asChild
        >
          <Link href="#">Privacy Policy</Link>
        </Button>
      </div>
    </div>
  );
};
