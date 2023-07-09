import { Button } from "@/components/ui/button";
import Logo from "../../assets/Logo.png";

export function OnboardingPage() {
  return (
    <div className="flex min-h-screen w-screen flex-col gap-12 border border-green-500 px-4 ">
      <header className="mt-6">
        <img src={Logo} className="w-48 xl:w-48"></img>
      </header>
      <main className="mx-auto border-red-500 xl:w-[50rem]">
        <h1 className="text-2xl font-bold">
          Please answer some of the questions to complete your profile
        </h1>
        <div className="mt-8 rounded-md bg-sky-200 px-8 py-4 font-medium text-gray-700">
          Everlasting Ties is a matrimonial application. These means that you
          need to enter some of your personal details such as age, address,
          religion, educational background, professional experience etc.
        </div>

        <div className="mt-8">
          <h1>Here are some things you should consider.</h1>
          <ul className="ml-3 mt-8 flex list-disc flex-col  gap-4">
            <li>
              The answer to these questions will determine the kind of profiles
              you will see on the dashboard page. Hence, answering these
              questions honestly is extremely important.
            </li>
            <li>
              The answers to the questions will be shown in your profile page.
              This means, anyone visiting your profile page will be able to see
              your interests, biography, education, professional experience and
              so on.
            </li>
            <li>
              You can always edit your answer from the accounts section. So,
              although you should answer these question hoenstly, don’t stress
              too much to give the perfect answer. You can always edit it.
            </li>
          </ul>
        </div>
        <Button className="text-md ml-auto mt-4 block bg-red-500  hover:bg-red-500">
          Get Started
        </Button>
      </main>
    </div>
  );
}
