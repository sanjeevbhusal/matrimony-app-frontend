// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
//   );
// }

import { Button } from "@/components/ui/button";
import Logo from "@/public/images/Logo.png";
import HeroImage from "@/public/images/hero-image.png";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  console.log(Logo, HeroImage);
  return (
    <div className="mx-4 xl:mx-[7%]">
      <header className="mt-6 flex items-center justify-between">
        <Image
          src={Logo}
          height={200}
          width={200}
          className="w-32 xl:w-48"
          alt="Logo"
        />
        <div className="flex gap-3">
          <Link href="/login">
            <Button className="border  border-[#CDCDCD] bg-white px-4 text-sm text-black hover:bg-white">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="border border-[#FF0505] bg-white px-4 text-[#FF0505] hover:bg-white">
              Create Profile
            </Button>
          </Link>
        </div>
      </header>
      <main className="mt-20 flex flex-col justify-between gap-8 text-center xl:mt-56 xl:flex-row xl:gap-0 xl:text-start ">
        <div>
          <h1 className="mx-auto w-80 text-center font-roboto text-3xl font-medium xl:w-[40rem] xl:text-start xl:text-4xl xl:marker:leading-[3.12rem]">
            EverLasting Ties is a better way to find your soulmate
          </h1>
          <h2 className="mx-auto mt-10 w-96 text-center text-xl text-[#636363] xl:mx-0 xl:w-[38rem] xl:text-start xl:text-2xl  xl:leading-8">
            Meet people who share the common interest as you. Find relevant
            profiles, communicate and form connections.
          </h2>
          <Link href="/dashboard">
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
