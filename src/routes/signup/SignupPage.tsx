import SignupForm from "./SignupForm";
import Logo from "../../assets/Logo.png";

export function SignupPage() {
  return (
    <div className="flex min-h-screen w-screen flex-col gap-12 border border-green-500 px-4 ">
      <header className="mt-6">
        <img src={Logo} className="w-48 xl:w-48"></img>
      </header>
      <main className="mx-auto border-red-500 xl:w-[30rem]">
        <h1 className="text-center text-2xl font-bold">
          Make the most out of your love life
        </h1>
        <h2 className="text-md mt-2 text-center text-[#555555]">
          Join to find people that match your interest
        </h2>
        <div className="mt-8 rounded-lg border border-[#CFCFCF] px-10 py-4">
          <SignupForm />
        </div>
      </main>
    </div>
  );
}
