import { Context } from "@/lib/providers/AuthProvider";
import { useContext } from "react";

function useAuth() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAuth should only be used within AuthProvider");
  }
  return context;
}

export { useAuth };
