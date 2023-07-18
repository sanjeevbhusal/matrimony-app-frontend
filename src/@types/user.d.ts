interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  user: User | null;
  userFetchingCompleted: boolean;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  bio?: string;
  interests: Interest[];
  address?: string;
  highestEducation?: string;
  currentProfession?: string;
  age?: number;
}

enum UserRole {
  User = "User",
  Admin = "Admin",
}

enum Interest {
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
