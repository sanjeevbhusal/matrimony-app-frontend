import { useAuthentication } from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export function PublicRoute() {
  const { user } = useAuthentication();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
