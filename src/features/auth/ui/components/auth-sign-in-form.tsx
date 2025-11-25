"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { signInSchema } from "@/features/auth/schemas";
import { InputPassword } from "@/features/auth/ui/components/input-password";
import { authClient } from "@/lib/auth/client";

import type { SignInSchema } from "@/features/auth/schemas";

export const AuthSignInForm = () => {
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
              toast.success("Signed In successfully");
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
    <>
      <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmitform)}>
        <FieldGroup className="gap-6">
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
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
      </form>

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
    </>
  );
};
