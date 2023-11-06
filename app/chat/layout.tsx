"use client";

import { useAuth } from "@/hooks/useAuth";
import { hasCompletedOnboarding } from "@/lib/utils";
import { redirect, usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const pathname = usePathname();

  if (!user) {
    return redirect(`/login?from=${pathname}`);
  }

  const onboardingComplete = hasCompletedOnboarding(user);

  if (!onboardingComplete) {
    return redirect(`/onboarding`);
  }

  return children;
}
