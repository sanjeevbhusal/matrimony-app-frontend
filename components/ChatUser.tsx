"use client";

import { User } from "@/lib/types";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn, getUserFullName } from "@/lib/utils";
import axios from "axios";
import { API_URL } from "@/lib/constants";

interface ChatUserProps {
  user: User;
  chatId: string;
}

function ChatUser({ user, chatId }: ChatUserProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  async function getChatId() {
    try {
      const response = await axios.get(`${API_URL}/chats?userId=${user.id}`, {
        withCredentials: true,
      });
      const existingChatId = response.data[0]?.id;
      if (existingChatId) {
        return existingChatId;
      }

      const r = await axios.post(
        `${API_URL}/chats`,
        {
          userId: user.id,
        },
        {
          withCredentials: true,
        }
      );
      const newChatId = r.data.id;
      return newChatId;
    } catch (error) {
      console.log(error);
    }
  }

  async function onUserClick() {
    // create chat Id
    let chatId = await getChatId();

    const params = new URLSearchParams(searchParams);
    params.set("chatId", chatId);

    router.push(`${pathName}?${params.toString()}`);
  }

  const isChatSelected = searchParams.get("chatId") === chatId;

  return (
    <div
      className={cn(
        "flex p-2 hover:bg-gray-200 gap-2 items-center cursor-pointer rounded-2xl",
        {
          "bg-gray-200": isChatSelected,
        }
      )}
      onClick={onUserClick}
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
