import createChat from "@/actions/createChat";
import getChatProfiles from "@/actions/getChatProfiles";
import getServerSession from "@/actions/getServerSession";
import ChatScreen from "@/components/ChatScreen";
import ChatUser from "@/components/ChatUser";
import NavBar from "@/components/NavBar";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/lib/constants";
import { ChatWithUsers } from "@/lib/schema/ChatSchema";
import { User } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    chatId: string;
    userId: string;
  };
}

// get Users who have had conversations with the current user.

export default async function Page({ searchParams }: PageProps) {
  // const response = await axios.get(`${API_URL}/users`);
  // const users = response.data as User[];
  // const userId = searchParams.userId;
  if (searchParams.userId) {
    const response = await createChat(searchParams.userId);
    console.log({ response });
    if (!response) {
      redirect(`/chat`);
    }
    redirect(`/chat?chatId=${response.id}`);
  }

  const user = await getServerSession();
  const chatProfiles = await getChatProfiles();

  const activeChat = chatProfiles.find(
    (chat) => chat.id === searchParams.chatId
  );
  const activeUser = activeChat?.users.find((u) => u.id !== user?.id) as User;

  return (
    <main className="h-screen flex flex-col gap-14">
      <div>
        <NavBar />
      </div>
      <div className="flex-grow flex overflow-auto">
        <div className="border-r flex flex-col gap-2 px-4 py-2">
          {chatProfiles.map((chat) => (
            <ChatUser
              key={chat.id}
              user={chat.users.find((u) => u.id !== user?.id) as User}
              chatId={chat.id}
            />
          ))}
        </div>

        {activeUser ? (
          <div className="flex-grow flex flex-col h-full">
            <div className="px-2 py-4 border-b flex items-center gap-4">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                alt="User Image"
                height={32}
                width={32}
                className="rounded-full w-8 h-8"
              />
              <p>
                {activeUser.firstName} {activeUser.lastName}
              </p>
              <p></p>
              {/* Chat Information */}
            </div>
            <div className=" h-full overflow-y-auto">
              <ChatScreen chatId={searchParams.chatId} />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
