import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";

import { signInSchema } from "@/features/auth/schemas";
import { authClient } from "@/lib/auth/client";

import type { SignInSchema } from "@/features/auth/schemas";

export const useSignIn = () => {
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

  return {
    form,
    onSubmitform,
    isPending,
  };
};
