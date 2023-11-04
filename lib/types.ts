import { z } from "zod";
import { UserSchema } from "./schema/UserSchema";

export type User = z.infer<typeof UserSchema>;

export enum UserRole {
  User = "User",
  Admin = "Admin",
}

export enum UserInterest {
  Travel = "travel",
  Sports = "sports",
  Reading = "reading",
  Music = "music",
  Movies = "movies",
  Cooking = "cooking",
  Art = "art",
  Photography = "photography",
  Outdoor = "outdoor",
  Hiking = "hiking",
  Gaming = "gaming",
  Fashion = "fashion",
  Dancing = "dancing",
  Technology = "technology",
  Food = "food",
  Volunteer = "volunteer",
  Pets = "pets",
  Yoga = "yoga",
  Writing = "writing",
  Gardening = "gardening",
}

export interface UserInterestWithLabel {
  value: UserInterest;
  label: string;
}

export interface GenericResponse {
  message: string;
  data: object;
}
