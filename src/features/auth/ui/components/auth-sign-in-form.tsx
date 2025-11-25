"use client";

import { UserIcon } from "lucide-react";
import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { useSignIn } from "@/features/auth/hooks/use-sign-in";
import { InputPassword } from "@/features/auth/ui/components/input-password";

export const AuthSignInForm = () => {
  const { form, isPending, onSubmitform } = useSignIn();

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
