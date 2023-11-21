"use client";
import Image from "next/image";
import ChatScreen from "./ChatScreen";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/lib/constants";
import { User } from "@/lib/types";

interface Message {
  id: string;
  message: string;
  sentBy: string;
}

export default function ChatBigScreen({ chatId }: { chatId: string }) {
  const session = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const currentUser = session.user as User;

  useEffect(() => {
    async function fetchChatInformation() {
      try {
        const response = await axios.get(`${API_URL}/chats/${chatId}`, {
          withCredentials: true,
        });
        const user = response.data.users.find(
          (user: User) => user.id !== currentUser.id
        );
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchChatMessages() {
      try {
        const response = await axios.get(
          `${API_URL}/messages?chatId=${chatId}`,
          {
            withCredentials: true,
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchChatInformation();
    fetchChatMessages();
  }, [chatId]);

  return (
    <div className="grow flex flex-col overflow-hidden">
      <div className="px-2 py-4 border-b flex items-center gap-4">
        <Image
          src={
            user?.image ||
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          }
          alt="User Image"
          height={32}
          width={32}
          className="rounded-full w-8 h-8"
        />
        <p>
          {user?.firstName} {user?.lastName}
        </p>
        <p></p>
      </div>

      <ChatScreen messages={messages} chatId={chatId} />
    </div>
  );
}
