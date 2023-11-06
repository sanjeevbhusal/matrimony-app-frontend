import getChatProfiles from "@/actions/getChatProfiles";
import getServerSession from "@/actions/getServerSession";
import ChatScreen from "@/components/ChatScreen";
import ChatUser from "@/components/ChatUser";
import NavBar from "@/components/NavBar";
import { API_URL } from "@/lib/constants";
import { ChatWithUsers } from "@/lib/schema/ChatSchema";
import { User } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

interface PageProps {
  searchParams: {
    chatId: string;
  };
}

// get Users who have had conversations with the current user.

export default async function Page({ searchParams }: PageProps) {
  // const response = await axios.get(`${API_URL}/users`);
  // const users = response.data as User[];
  // const userId = searchParams.userId;
  const user = await getServerSession();
  const chatProfiles = await getChatProfiles();
  console.log(chatProfiles);

  // const r = await axios.get(
  //   `${API_URL}/authentication/current-user?route=chat`,
  //   {
  //     headers: {
  //       Cookie: `userId=${cookies().get("userId")?.value};`,
  //     },
  //   }
  // );
  // const currentUser = r.data as User;
  // const chats = currentUser.chats as ;

  // I want to see what are the chats the user has been involved in.,

  // users = ["dfjkasdfa", "dfkajdslsadf"]
  // one of them is you. you could be anyone of them.

  return (
    <main className="min-h-screen flex flex-col  border-red-500">
      {/* Dashboard page */}
      <NavBar />
      <div className="mt-16 flex grow">
        <div className="border-r flex flex-col gap-2 px-2">
          {chatProfiles.map((chat) => (
            <ChatUser
              key={chat.id}
              user={chat.users.find((u) => u.id !== user?.id) as User}
              chatId={chat.id}
            />
          ))}
        </div>
      </div>
      <ChatScreen chatId={searchParams.chatId} />
    </main>
  );
}
