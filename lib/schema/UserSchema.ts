import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.string(),
  bio: z.string().nullable(),
  interests: z.array(z.string()),
  currentAddress: z.string().nullable(),
  highestEducation: z.string().nullable(),
  currentProfession: z.string().nullable(),
  age: z.number().nullable(),
});
