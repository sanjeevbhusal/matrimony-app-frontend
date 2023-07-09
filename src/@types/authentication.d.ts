import { Login } from "@/lib/schema/loginSchema";
import { Signup } from "@/lib/schema/signupschema";

export interface AuthenticationProviderProps {
  children: ReactNode;
}

export interface AuthenticationContextType {
  accessToken: string | null;
  onLogin: (values: Login) => void;
  onSignup: (values: Signup) => void;
}
