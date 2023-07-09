import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().trim().min(1, "Please enter Password"),
});

export type Login = z.TypeOf<typeof loginSchema>;
