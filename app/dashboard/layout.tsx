"use client";

import { useAuth } from "@/lib/providers/AuthProvider";
import { redirect, usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();

  const router = useRouter();

  if (!user) {
    return redirect(`/login?from=${pathname}`);
  }

  const {
    bio,
    interests,
    currentAddress,
    age,
    currentProfession,
    highestEducation,
  } = user;

  const onboardingCompleted = !!(
    bio &&
    currentAddress &&
    age &&
    currentProfession &&
    highestEducation &&
    interests.length > 0
  );

  // If the user has not competed onboarding, they should not be able to visit any other page in the application. So, redirect them to "/onboarding"

  console.log(onboardingCompleted, user);

  if (!onboardingCompleted) {
    return redirect(`/onboarding`);
  }

  return children;
}
