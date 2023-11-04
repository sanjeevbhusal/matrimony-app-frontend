import Logo from "@/public/images/Logo.png";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-screen w-screen flex-col gap-12 px-4 ">
      <header className="mt-6">
        <Image
          src={Logo}
          height={100}
          width={100}
          alt="Logo"
          className="w-48 xl:w-48"
        ></Image>
      </header>
      <main className="mx-auto xl:w-[35rem]">
        <h1 className="text-center text-2xl font-bold">
          Enter your registered email to reset password
        </h1>
        <p className="text-md mt-4 text-center text-gray-500">
          You will receive a email with instructions on how to reset your
          password
        </p>

        <div className="mt-8 rounded-lg border border-[#CFCFCF] px-10 py-4">
          <ForgotPasswordForm />
        </div>
      </main>
    </div>
  );
}
