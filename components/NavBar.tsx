"use client";

import Logo from "@/public/images/Logo.png";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const navLinks = [
  {
    label: "All Profiles",
    route: "/home",
  },
  {
    label: "Liked Profiles",
    route: "/liked-profiles",
  },
];

function NavBar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 right-0 px-4 py-2 md:px-10 lg:px-16 flex justify-between items-center border-b">
      <Image
        src={Logo}
        height={200}
        width={200}
        className="w-32 xl:w-48"
        alt="Logo"
      />
      {!user ? (
        <div className="flex gap-3">
          <Link href="/login">
            <Button className="border  border-[#CDCDCD] bg-white px-4 text-sm text-black hover:bg-gray-100">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="border text-white px-4 bg-[#FF1850] hover:bg-rose-600">
              Create Profile
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-8">
          <div className="flex gap-2">
            {navLinks.map((link) => (
              <Link href={link.route} key={link.label}>
                <Button variant="ghost">{link.label}</Button>
              </Link>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => router.push("/chat")}>
                Chat
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

export default NavBar;
