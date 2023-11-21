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
  messages: Message[];
}

interface Message {
  id: string;
  message: string;
  sentBy: string;
}

function ChatScreen({ chatId, messages: existingMessages }: Props) {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>(existingMessages);
  const { user } = useAuth();

  useEffect(() => {
    setMessages([]);
    async function getMessages() {
      const response = await axios.get(`${API_URL}/messages?chatId=${chatId}`);
      const messages = response.data as Message[];
      for (let i = 0; i < 50; i++) {
        console.log(i);
        setMessages((prev) => [...prev, ...messages]);
      }
      // setMessages(messages);
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
    }
  }
  console.log(messages);

  return (
    <div className="grow p-2 flex flex-col justify-between overflow-auto">
      <div className="grow flex flex-col gap-4 pb-28 overflow-auto">
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

      <div className="p-4 bg-white ">
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
