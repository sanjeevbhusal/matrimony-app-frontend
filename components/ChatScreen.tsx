"use client";

import getMessages from "@/actions/getMessages";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/lib/constants";
import { KeyboardEvent } from "react";
import { set } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface Props {
  chatId: string;
}

interface Message {
  id: string;
  message: string;
  sentBy: string;
}

function ChatScreen({ chatId }: Props) {
  // implement this in the backend
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function getMessages() {
      const response = await axios.get(`${API_URL}/messages?chatId=${chatId}`);
      const messages = response.data as Message[];
      setMessages(messages);
    }
    getMessages();
  }, [chatId]);

  async function sendMessage(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      setValue("");
      const response = await axios.post(`${API_URL}/messages`, {
        chatId,
        message: value,
        sentBy: user?.id,
      });
      const message = response.data as Message;
      setMessages([...messages, message]);
    }
  }

  return (
    <div className="h-full p-2 ">
      <div className="flex flex-col gap-4 pb-28 overflow-y-auto">
        {messages.map((message) => (
          <div
            className={cn("bg-gray-200 py-2 px-4 w-fit rounded-2xl", {
              "ml-auto bg-blue-500 text-white": message.sentBy === user?.id,
            })}
            key={message.id}
          >
            {message.message}
          </div>
        ))}
      </div>

      <div className="fixed left-[179px] right-4 bottom-0 p-4 bg-white ">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border-gray-400 w-full min-h-[40px] rounded-3xl"
          onKeyDown={sendMessage}
          placeholder="Aa"
        />
      </div>
    </div>
  );
}

export default ChatScreen;
