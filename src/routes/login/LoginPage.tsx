import LoginForm from "./LoginForm";
import Logo from "../../assets/Logo.png";

export function LoginPage() {
  return (
    <div className="flex min-h-screen w-screen flex-col gap-12 px-4 ">
      <header className="mt-6">
        <img src={Logo} className="w-48 xl:w-48"></img>
      </header>
      <main className="mx-auto xl:w-[30rem]">
        <h1 className="text-center text-2xl font-bold">
          Login to find your perfect match
        </h1>

        <div className="mt-8 rounded-lg border border-[#CFCFCF] px-10 py-4">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
