"use client";

import Logo from "@/public/images/Logo.png";
import { FirstOnboardingStep } from "./FirstOnboardingStep";
import { SecondOnboardingStep } from "./SecondOnboardingStep";
import { OnboardingInformation } from "./OnboardingInformation";
import { useState } from "react";
import { ThirdOnboardingStep } from "./ThirdOnboardingStep";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const router = useRouter();

  const [onboardingStep, setOnboardingStep] = useState(0);

  let content = <OnboardingInformation onStart={() => setOnboardingStep(1)} />;

  if (onboardingStep === 1) {
    content = <FirstOnboardingStep onSuccess={() => setOnboardingStep(2)} />;
  }

  if (onboardingStep === 2) {
    content = <SecondOnboardingStep onSuccess={() => setOnboardingStep(3)} />;
  }

  if (onboardingStep === 3) {
    content = (
      <ThirdOnboardingStep onSuccess={() => router.push("/dashboard")} />
    );
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
