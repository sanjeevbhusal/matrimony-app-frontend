import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export function useUser(): UserContextType {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser hook must only be used within User Provider");
  }

  return context;
}
