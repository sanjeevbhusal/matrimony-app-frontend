import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

export function ProtectedRoute() {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
