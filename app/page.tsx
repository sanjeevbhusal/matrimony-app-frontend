// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
//   );
// }

// "use client";

import getServerSession from "@/actions/getServerSession";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/public/images/Logo.png";
import HeroImage from "@/public/images/hero-image.png";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getServerSession();

  if (user) {
    return redirect("/home");
  }

  return (
    <div className="mx-4 xl:mx-[7%]">
      <NavBar />

      <main className="mt-20 flex flex-col justify-between gap-8 text-center xl:mt-56 xl:flex-row xl:gap-0 xl:text-start ">
        <div>
          <h1 className="mx-auto w-80 text-center font-roboto text-3xl font-medium xl:w-[40rem] xl:text-start xl:text-4xl xl:marker:leading-[3.12rem]">
            EverLasting Ties is a better way to find your soulmate
          </h1>
          <h2 className="mx-auto mt-10 w-96 text-center text-xl text-[#636363] xl:mx-0 xl:w-[38rem] xl:text-start xl:text-2xl  xl:leading-8">
            Meet people who share the common interest as you. Find relevant
            profiles, communicate and form connections.
          </h2>
          <Link href="/home">
            <Button className="mt-14 bg-[#FF1850]  px-8 text-xl font-bold leading-[3.125rem] text-white hover:bg-[#FF1850]">
              View Profiles
            </Button>
          </Link>
          <div className="mt-2.5"></div>
        </div>
        <div>
          <Image
            src={HeroImage}
            height={400}
            width={400}
            className="w-full"
            alt="Hero Image"
          />
        </div>
      </main>
    </div>
  );
}
