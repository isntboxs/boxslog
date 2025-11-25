"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon, UserIcon } from "lucide-react";
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
import { signUpSchema } from "@/features/auth/schemas";
import { InputPassword } from "@/features/auth/ui/components/input-password";
import { authClient } from "@/lib/auth/client";

import type { SignUpSchema } from "@/features/auth/schemas";

export const AuthSignUpForm = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const onSubmitform = useCallback(
    async (values: SignUpSchema) => {
      startTransition(async () => {
        await authClient.signUp.email({
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
          fetchOptions: {
            onSuccess: () => {
              form.reset();
              toast.success("Signed Up successfully", {
                description: "You can now sign in",
              });
              router.push("/sign-in");
            },

            onError: (ctx) => {
              toast.error("Failed to sign up", {
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
      <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmitform)}>
        <FieldGroup className="gap-6">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputGroup>
                  <InputGroupInput
                    id="sign-up-form-name"
                    type="text"
                    placeholder="Enter your name"
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
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputGroup>
                  <InputGroupInput
                    id="sign-up-form-username"
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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputGroup>
                  <InputGroupInput
                    id="sign-up-form-email"
                    type="email"
                    placeholder="Enter your email"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  <InputGroupAddon>
                    <MailIcon />
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
                  id="sign-up-form-password"
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

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <InputPassword
                  id="sign-up-form-confirm-password"
                  placeholder="Confirm your password"
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
        form="sign-up-form"
        type="submit"
        className="w-full"
        disabled={isPending || !form.formState.isValid}
      >
        {isPending ? (
          <>
            <Spinner /> <span>Signing Up...</span>
          </>
        ) : (
          <span>Sign Up</span>
        )}
      </Button>
    </>
  );
};
