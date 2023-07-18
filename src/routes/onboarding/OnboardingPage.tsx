import Logo from "../../assets/Logo.png";
import { FirstOnboardingStep } from "./FirstOnboardingStep";
import { SecondOnboardingStep } from "./SecondOnboardingStep";
import { OnboardingInformation } from "./OnboardingInformation";
import { useState } from "react";

export function OnboardingPage() {
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
      <main className="mx-auto border-red-500 xl:w-[50rem]">
        <h1>Lets get to know your personal details more</h1>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen w-screen flex-col gap-12 border border-green-500 px-4 ">
      <header className="mt-6">
        <img src={Logo} className="w-48 xl:w-48"></img>
      </header>
      {content}
    </div>
  );
}
