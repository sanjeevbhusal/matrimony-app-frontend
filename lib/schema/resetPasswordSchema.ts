import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, "Password must be between 8-20 characters")
      .max(20, "Password must be between 8-20 characters"),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password should match Password",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
