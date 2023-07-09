interface UserProviderProps {
  children: ReactNode;
}

interface UserContextType {
  user: any;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

enum UserRole {
  User = "User",
  Admin = "Admin",
}
