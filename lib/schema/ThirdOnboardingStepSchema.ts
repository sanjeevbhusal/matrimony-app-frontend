import { z } from "zod";

export const thirdOnboardingStepSchema = z.object({
  age: z.preprocess(
    (value) => parseInt(value as string) || 0,
    z
      .number()
      .min(18, "Age cannot be less than 18")
      .max(50, "Age cannot be greater than 50")
  ),
  highestEducation: z
    .string()
    .trim()
    .min(1, "Highest Education cannot be empty"),
  currentProfession: z
    .string()
    .trim()
    .min(1, "Current Profession cannot be empty"),
  currentAddress: z.string().trim().min(1, "Current Address cannot be empty"),
  image: z.instanceof(File).refine((file) => {
    if (!file.name) return false;
    return true;
  }, "Image is required"),
});

export type ThirdOnboardingStepSchema = z.infer<
  typeof thirdOnboardingStepSchema
>;
