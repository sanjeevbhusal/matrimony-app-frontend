import { API_URL } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResetPasswordForm from "./ResetPasswordForm";
import Logo from "../../assets/Logo.png";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const urlSearchParams = useSearchParams()[0];
  const [loadingInitial, setloadingInitial] = useState(false);

  useEffect(() => {
    const resetPasswordToken = urlSearchParams.get("token");

    if (!resetPasswordToken) {
      navigate("/");
      return;
    }

    axios
      .get(
        `${API_URL}/authentication/resetPassword/validateToken?token=${resetPasswordToken}`
      )
      .then(() => setloadingInitial(true))
      .catch(() => navigate("/"));
  }, []);

  return loadingInitial ? (
    <div className="flex min-h-screen w-screen flex-col gap-12 px-4 ">
      <header className="mt-6">
        <img src={Logo} className="w-48 xl:w-48"></img>
      </header>
      <main className="mx-auto xl:w-[30rem]">
        <h1 className="text-center text-2xl font-bold">Reset Your Password</h1>

        <div className="mt-8 rounded-lg border border-[#CFCFCF] px-10 py-4">
          <ResetPasswordForm />
        </div>
      </main>
    </div>
  ) : (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1 className="text-3xl">Loading...</h1>
    </div>
  );
}

export { ResetPasswordPage };
