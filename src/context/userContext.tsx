import { useAuthentication } from "@/hooks/useAuthentication";
import { API_URL } from "@/lib/constants";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const { accessToken } = useAuthentication();

  useEffect(() => {
    if (!accessToken) return;

    const getUser = async () => {
      const response = await axios.get<User>(
        `${API_URL}/authentication/get_user_from_token`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUser(response.data);
    };

    getUser();
  }, [accessToken]);

  const value = { user };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
