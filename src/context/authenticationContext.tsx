import { API_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createContext } from "react";
import {
  AuthenticationContextType,
  AuthenticationProviderProps,
} from "@/@types/authentication";
import { Signup } from "@/lib/schema/signupschema";
import { Login } from "@/lib/schema/loginSchema";

export const AuthenticationContext =
  createContext<AuthenticationContextType | null>(null);

export function AuthenticationProvider({
  children,
}: AuthenticationProviderProps) {
  const [accessToken, setAccessToken] = useState<null | string>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(JSON.parse(token));
    }
  }, []);

  const handleLogin = async (values: Login) => {
    const response = await axios.post(
      `${API_URL}/authentication/login`,
      values
    );
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    setAccessToken(accessToken);

    const origin = location.state?.from?.pathname || "/dashboard";
    navigate(origin);
  };

  const handleSignup = async (values: Signup) => {
    const response = await axios.post(
      `${API_URL}/authentication/signup`,
      values
    );

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    setAccessToken(accessToken);

    navigate("/onboarding");
  };

  const value = { accessToken, onLogin: handleLogin, onSignup: handleSignup };

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}
