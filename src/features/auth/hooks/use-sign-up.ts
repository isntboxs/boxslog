import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { signUpSchema } from "@/features/auth/schemas";
import { authClient } from "@/lib/auth/client";
import { getCallbackUrl } from "@/utils/get-callback-url";

import type { SignUpSchema } from "@/features/auth/schemas";

export const useSignUp = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const params = useSearchParams();

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
              router.push(
                `/sign-in?callbackUrl=${encodeURIComponent(getCallbackUrl(params))}`
              );
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
    [form, router, params]
  );

  return {
    form,
    onSubmitform,
    isPending,
  };
};
