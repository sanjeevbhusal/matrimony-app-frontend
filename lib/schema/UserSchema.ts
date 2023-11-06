import { z } from "zod";
import { chatSchema } from "./ChatSchema";

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
  facebookUrl: z.string().nullable(),
  instagramUrl: z.string().nullable(),
  chatIds: z.array(z.string()),
  chats: z.array(chatSchema),
});
