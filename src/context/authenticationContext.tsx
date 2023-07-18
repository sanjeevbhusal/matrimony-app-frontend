import { API_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createContext, ReactNode } from "react";

import { Signup } from "@/lib/schema/signupschema";
import { Login } from "@/lib/schema/loginSchema";

// *****************TYPES*************************

interface AuthenticationProviderProps {
  children: ReactNode;
}

interface AuthenticationContextType {
  user?: User;
  onLogin: (values: Login) => void;
  onSignup: (values: Signup) => void;
}

// ************CONTEXT******************

const AuthenticationContext = createContext<AuthenticationContextType | null>(
  null
);

// ***************Provider*********************

function AuthenticationProvider({
  children,
}: AuthenticationProviderProps): JSX.Element {
  const [user, setUser] = useState<User>();
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // this is required to send cookies with every request.
    axios.defaults.withCredentials = true;

    const getUser = async () => {
      try {
        const response = await axios.get<User>(
          `${API_URL}/authentication/get_user_from_token`
        );
        setUser(response.data);
      } catch (e) {
        //
      } finally {
        setLoadingInitial(false);
      }
    };
    getUser();
  }, []);

  const login = async (values: Login) => {
    const response = await axios.post(
      `${API_URL}/authentication/login`,
      values
    );

    setUser(response.data);

    const origin = location.state?.from?.pathname || "/dashboard";
    navigate(origin);
  };

  const signup = async (values: Signup) => {
    const response = await axios.post(
      `${API_URL}/authentication/signup`,
      values
    );

    setUser(response.data);
    navigate("/onboarding");
  };

  const value = { user, onLogin: login, onSignup: signup };

  return (
    <AuthenticationContext.Provider value={value}>
      {loadingInitial ? <h1>Loading...</h1> : children}
    </AuthenticationContext.Provider>
  );
}

export { AuthenticationProvider, AuthenticationContext };
