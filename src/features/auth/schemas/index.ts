import * as z from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .nonempty({ error: "Username is required" })
    .max(30, { error: "Username must be less than 30 characters long" }),
  password: z
    .string()
    .nonempty({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(128, { error: "Password must be less than 128 characters long" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
