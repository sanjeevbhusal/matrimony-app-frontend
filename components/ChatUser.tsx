"use client";

import { User } from "@/lib/types";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getUserFullName } from "@/lib/utils";

interface ChatUserProps {
  user: User;
}

function ChatUser({ user }: ChatUserProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  function onUserClick(user: User) {
    const params = new URLSearchParams(searchParams);
    params.set("userId", user.id);

    router.push(`${pathName}?${params.toString()}`);
  }

  return (
    <div
      className="flex p-2 hover:bg-gray-200 gap-2 items-center cursor-pointer"
      onClick={() => onUserClick(user)}
    >
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        alt="User Image"
        height={32}
        width={32}
        className="rounded-full w-8 h-8"
      />
      <p>{getUserFullName(user.firstName, user.lastName)}</p>
    </div>
  );
}

export default ChatUser;
