import axios from "axios";
import getServerSession from "./getServerSession";
import { API_URL } from "@/lib/constants";
import { User } from "@/lib/types";
import { Chat, ChatWithUsers } from "@/lib/schema/ChatSchema";
import { cookies } from "next/headers";

interface Message {
  id: string;
  message: string;
}

async function getMessages(chatId: string) {
  if (!chatId) {
    throw new Error("User not found");
  }

  const cookieStore = cookies();
  const userId = cookieStore.get("userId");
  if (!userId) {
    throw new Error("User not found");
  }

  const response = await axios.get(`${API_URL}/messages?chatId=${chatId}`, {
    headers: {
      Cookie: `userId=${userId.value};`,
    },
  });
  const chatProfiles = response.data as Message[];
  return chatProfiles;
}

export default getMessages;
