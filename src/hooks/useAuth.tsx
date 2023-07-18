import { AuthenticationContext } from "@/context/authenticationContext";
import { useContext } from "react";

export function useAuthentication() {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication hook must only be used within Authentication Provider"
    );
  }

  return context;
}
