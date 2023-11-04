"use client";

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResetPasswordForm from "./ResetPasswordForm";
import Logo from "../../assets/Logo.png";
import { useQuery } from "@tanstack/react-query";
// import { validateResetPasswordToken } from "@/api/auth";

export default function PasswordPage() {
  // const navigate = useNavigate();
  // const urlSearchParams = useSearchParams()[0];
  // const resetPasswordToken = urlSearchParams.get("token");
  // const { isError, isLoading, isSuccess } = useQuery(
  //   ["validateToken", resetPasswordToken],
  //   () => validateResetPasswordToken(resetPasswordToken as string),
  //   {
  //     retry: false,
  //     enabled: !!resetPasswordToken,
  //     refetchOnWindowFocus: false,
  //   }
  // );
  // useEffect(() => {
  //   if (!resetPasswordToken || isError) {
  //     navigate("/");
  //   }
  // }, [resetPasswordToken, navigate, isError]);
  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen w-screen items-center justify-center">
  //       <h1 className="text-3xl">Loading...</h1>
  //     </div>
  //   );
  // }
  // if (isSuccess) {
  //   return (
  //     <div className="flex min-h-screen w-screen flex-col gap-12 px-4 ">
  //       <header className="mt-6">
  //         <img src={Logo} className="w-48 xl:w-48"></img>
  //       </header>
  //       <main className="mx-auto xl:w-[30rem]">
  //         <h1 className="text-center text-2xl font-bold">
  //           Reset Your Password
  //         </h1>
  //         <div className="mt-8 rounded-lg border border-[#CFCFCF] px-10 py-4">
  //           <ResetPasswordForm
  //             resetPasswordToken={resetPasswordToken as string}
  //           />
  //         </div>
  //       </main>
  //     </div>
  //   );
  // }
  return <div></div>;
}
