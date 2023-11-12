import { API_URL } from "@/lib/constants";
import axios from "axios";
import { cookies } from "next/headers";

interface Chat {
  userIds: string[];
  id: string;
}

async function createChat(chatUserId: string) {
  if (!chatUserId) {
    throw new Error("ChatUserId is required");
  }

  const cookieStore = cookies();
  const userId = cookieStore.get("userId");

  if (!userId) {
    throw new Error("User not found");
  }

  // const fetchChatresponse = await axios.get(
  //   `${API_URL}/chat`,
  //   {
  //     firstUserId: userId.value,
  //     secondUserId: chatUserId,
  //   },

  try {
    const response = await axios.post(
      `${API_URL}/chats`,
      {
        userId: chatUserId,
      },
      {
        headers: {
          Cookie: `userId=${userId.value};`,
        },
      }
    );
    const chat = response.data as Chat;
    return chat;
  } catch (error) {
    return null;
  }
}

export default createChat;
