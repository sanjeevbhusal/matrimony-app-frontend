"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { SignupSchema } from "../schema/signupschema";
import { API_URL } from "../constants";
import axios from "axios";
import { UserSchema } from "../schema/UserSchema";
import { z } from "zod";
import { User } from "../types";
import { LoginSchema } from "../schema/loginSchema";

interface AuthContext {
  user: User | null;
  signup: (values: SignupSchema) => Promise<void>;
  login: (values: LoginSchema) => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(
          `${API_URL}/authentication/current-user`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data);
      } catch (error) {}
    }

    fetchUser();
  }, []);

  console.log(user);

  async function signup(values: SignupSchema) {
    const response = await axios.post(
      `${API_URL}/authentication/signup`,
      values,
      {
        withCredentials: true,
      }
    );
    const user = UserSchema.parse(response.data);
    setUser(user);
  }

  async function login(values: SignupSchema) {
    const response = await axios.post(
      `${API_URL}/authentication/login`,
      values,
      {
        withCredentials: true,
      }
    );
    const user = UserSchema.parse(response.data);
    console.log("==>", user);
    setUser(user);
  }

  const value = {
    user,
    signup,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth should only be used within AuthProvider");
  }
  return context;
}

export { useAuth };
