"use client";

import Logo from "@/public/images/Logo.png";
import { FirstOnboardingStep } from "./FirstOnboardingStep";
import { SecondOnboardingStep } from "./SecondOnboardingStep";
import { OnboardingInformation } from "./OnboardingInformation";
import { useState } from "react";
import { ThirdOnboardingStep } from "./ThirdOnboardingStep";
import { redirect, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  // you cannot come to onboarding if you already have completed the flow or if user doesnot exists.
  const { user } = useAuth();
  const [onboardingStep, setOnboardingStep] = useState(0);

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
    image,
  } = user;

  const onboardingCompleted = !!(
    image &&
    bio &&
    currentAddress &&
    age &&
    currentProfession &&
    highestEducation &&
    interests.length > 0
  );

  // If the user has competed onboarding, they should be redirected to dashboard"
  if (onboardingCompleted) {
    return redirect(`/home`);
  }

  let content = <OnboardingInformation onStart={() => setOnboardingStep(1)} />;

  if (onboardingStep === 1) {
    content = <FirstOnboardingStep onSuccess={() => setOnboardingStep(2)} />;
  }

  if (onboardingStep === 2) {
    content = <SecondOnboardingStep onSuccess={() => setOnboardingStep(3)} />;
  }

  if (onboardingStep === 3) {
    // TODO: figure out why this line throws an error.
    // content = <ThirdOnboardingStep onSuccess={() => router.push("/home")} />;
    content = <ThirdOnboardingStep onSuccess={() => {}} />;
  }

  return (
    <div className="flex min-h-screen w-screen flex-col gap-12 border border-green-500 px-4 ">
      <header className="mt-6">
        <Image
          src={Logo}
          height={100}
          width={100}
          alt="Logo"
          className="w-48 xl:w-48"
        />
      </header>
      {content}
    </div>
  );
}
