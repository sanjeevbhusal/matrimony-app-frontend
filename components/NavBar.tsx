"use client";

import Logo from "@/public/images/Logo.png";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/providers/AuthProvider";

function NavBar() {
  const { logout } = useAuth();
  return (
    <div className="absolute top-0 left-0 right-0 px-6 py-2 md:px-10 lg:px-16 flex justify-between items-center border-b">
      <Image
        src={Logo}
        height={100}
        width={100}
        alt="Logo"
        className="w-48 xl:w-48"
      />

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default NavBar;
