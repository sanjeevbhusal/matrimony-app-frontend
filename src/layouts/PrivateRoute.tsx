import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthentication } from "@/hooks/useAuth";

export function PrivateRoute() {
  const { user } = useAuthentication();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const { bio, interests, address, age, currentProfession, highestEducation } =
    user;

  const onboardingCompleted =
    bio &&
    address &&
    age &&
    currentProfession &&
    highestEducation &&
    interests.length > 0;

  // If the user has not competed onboarding, they should not be able to visit any other page in the application. So, redirect them to "/onboarding"

  if (!onboardingCompleted && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  // If the user has completed onboarding, they should not be able to go to /onboarding. Instead, redirect them to /dashboard.

  if (onboardingCompleted && location.pathname === "/onboarding") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
