import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

export function UnprotectedRoute() {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/onboarding" />;
  }

  return <Outlet />;
}
