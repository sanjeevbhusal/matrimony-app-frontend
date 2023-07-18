import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, "Please enter a valid first name"),
    lastName: z.string().trim().min(1, "Please enter a valid last name"),
    // .regex(
    //   new RegExp("^([a-zA-Z]+)\\s([a-zA-Z]+)(?:\\s([a-zA-Z]+))?$"),
    //   "FullName should be either 2 or 3 words."
    // ),
    email: z.string().trim().email("Please enter a valid email address"),
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

export type Signup = z.TypeOf<typeof signupSchema>;
