import * as z from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .nonempty({ error: "Name is required" })
      .min(3, { error: "Name must be at least 3 characters long" })
      .max(50, { error: "Name must be less than 50 characters long" }),
    username: z
      .string()
      .nonempty({ error: "Username is required" })
      .min(3, { error: "Username must be at least 3 characters long" })
      .max(30, { error: "Username must be less than 30 characters long" }),
    email: z
      .email()
      .nonempty({ error: "Email is required" })
      .max(255, { error: "Email must be less than 255 characters long" }),
    password: z
      .string()
      .nonempty({ error: "Password is required" })
      .min(8, { error: "Password must be at least 8 characters long" })
      .max(128, { error: "Password must be less than 128 characters long" }),
    confirmPassword: z
      .string()
      .nonempty({ error: "Confirm Password is required" })
      .max(128, {
        error: "Confirm Password must be less than 128 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = signUpSchema.pick({
  username: true,
  password: true,
});

export type SignInSchema = z.infer<typeof signInSchema>;
