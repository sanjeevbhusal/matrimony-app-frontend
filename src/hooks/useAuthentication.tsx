import { AuthenticationContext } from "@/context/authenticationContext";
import { AuthenticationContextType } from "@/@types/authentication";
import { useContext } from "react";

export function useAuthentication(): AuthenticationContextType {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication hook must only be used within Authentication Provider"
    );
  }

  return context;
}
