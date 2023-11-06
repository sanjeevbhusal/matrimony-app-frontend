import { z } from "zod";
import { User } from "../types";

export const chatSchema = z.object({
  id: z.string(),
  userIds: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Chat = z.infer<typeof chatSchema>;

export type ChatWithUsers = Chat & { users: User[] };

// chatSchema with users.
