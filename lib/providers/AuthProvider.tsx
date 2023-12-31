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
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthContext {
  user: User | null;
  fetchUser: () => Promise<void>;
  signup: (values: SignupSchema) => Promise<void>;
  login: (values: LoginSchema) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | User>(null);
  const [fetchedUserAtLoad, setFetchedUserAtLoad] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const response = await axios.get(
        `${API_URL}/authentication/current-user`,
        {
          withCredentials: true,
        }
      );
      setUser(response.data);
    } catch (error) {
    } finally {
      setFetchedUserAtLoad(true);
    }
  }

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

  async function login(values: LoginSchema) {
    const response = await axios.post(
      `${API_URL}/authentication/login`,
      values,
      {
        withCredentials: true,
      }
    );
    const user = UserSchema.parse(response.data);
    setUser(user);
  }

  async function logout() {
    // await axios.post(`${API_URL}/authentication/logout`, {
    //   withCredentials: true,
    // });
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/login");
    setTimeout(() => setUser(null), 500);
  }

  const value = {
    user,
    fetchUser,
    signup,
    login,
    logout,
  };

  if (!fetchedUserAtLoad) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
export { AuthContext as Context };
