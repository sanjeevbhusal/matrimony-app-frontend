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
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";

const navLinks = [
  {
    label: "Home",
    route: "/home",
  },
  {
    label: "All Profiles",
    route: "/all-profiles",
  },
  {
    label: "Liked Profiles",
    route: "/liked-profiles",
  },
  {
    label: "Chat",
    route: "/chat",
  },
];

function NavBar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="absolute top-0 left-0 right-0 px-4 py-2 md:px-10 lg:px-16 flex justify-between items-center border-b">
      <Link href="/home">
        <Image
          src={Logo}
          height={200}
          width={200}
          className="w-32 xl:w-48"
          alt="Logo"
        />
      </Link>
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
          <div className="gap-2 hidden md:flex">
            {navLinks.map((link) => (
              <Link href={link.route} key={link.label}>
                <Button
                  variant="ghost"
                  className={cn({
                    "text-blue-500 hover:text-blue-600": pathname.includes(
                      link.route
                    ),
                  })}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Button variant="ghost" onClick={() => logout()}>
              Logout
            </Button>
          </div>
          <Sheet>
            <SheetTrigger className="md:hidden">
              <div className="py-2">
                <RxHamburgerMenu className="" size={22} />
              </div>
            </SheetTrigger>
            <SheetContent>
              <div className="gap-2 flex flex-col">
                {navLinks.map((link) => (
                  <Link href={link.route} key={link.label}>
                    <Button
                      variant="ghost"
                      className={cn("w-full justify-start", {
                        "text-blue-500 hover:text-blue-600": pathname.includes(
                          link.route
                        ),
                      })}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  onClick={() => logout()}
                  className="justify-start"
                >
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* <DropdownMenu>
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
          </DropdownMenu> */}
        </div>
      )}
    </div>
  );
}

export default NavBar;
