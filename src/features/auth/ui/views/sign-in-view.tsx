"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCallback, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { SIGN_IN_FORM } from "@/features/auth/constants";
import { signInSchema } from "@/features/auth/schemas";
import { InputPassword } from "@/features/auth/ui/components/input-password";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

import type { SignInSchema } from "@/features/auth/schemas";

interface Props {
  props?: React.ComponentProps<"div">;
}

export const SignInView = ({ props }: Props) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmitform = useCallback(
    async (values: SignInSchema) => {
      startTransition(async () => {
        await authClient.signIn.username({
          username: values.username,
          password: values.password,
          fetchOptions: {
            onSuccess: () => {
              form.reset();
              toast.success("Signed in successfully");
              router.push("/");
            },

            onError: (ctx) => {
              toast.error("Failed to sign in", {
                description: ctx.error.message,
              });
            },
          },
        });
      });
    },
    [form, router]
  );

  return (
    <div className={cn("flex flex-col gap-6", props?.className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            id="sign-in-form"
            className="p-6 md:p-8"
            onSubmit={form.handleSubmit(onSubmitform)}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-semibold">{SIGN_IN_FORM.title}</h1>

                <p className="text-muted-foreground text-balance">
                  {SIGN_IN_FORM.description}
                </p>
              </div>

              <FieldGroup className="gap-6">
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="sign-in-form-username">
                        Username
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          id="sign-in-form-username"
                          type="text"
                          placeholder="Enter your username"
                          aria-invalid={fieldState.invalid}
                          {...field}
                        />
                        <InputGroupAddon>
                          <UserIcon />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="sign-in-form-password">
                        Password
                      </FieldLabel>
                      <InputPassword
                        id="sign-in-form-password"
                        placeholder="Enter your password"
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button
                form="sign-in-form"
                type="submit"
                className="w-full"
                disabled={isPending || !form.formState.isValid}
              >
                {isPending ? (
                  <>
                    <Spinner /> <span>Signing In...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </Button>
            </div>

            <div className="text-muted-foreground mt-4 text-center text-sm">
              {SIGN_IN_FORM.footerText}{" "}
              <Button variant="link" size="sm" className="p-0" asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          </form>

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
          <Link href="#">Term of Service</Link>
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
