import ChatUser from "@/components/ChatUser";
import NavBar from "@/components/NavBar";
import { API_URL } from "@/lib/constants";
import { ChatWithUsers } from "@/lib/schema/ChatSchema";
import { User } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

interface PageProps {
  searchParams: {
    userId: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const response = await axios.get(`${API_URL}/users`);
  const users = response.data as User[];
  const userId = searchParams.userId;

  const r = await axios.get(
    `${API_URL}/authentication/current-user?route=chat`,
    {
      headers: {
        Cookie: `userId=${cookies().get("userId")?.value};`,
      },
    }
  );
  const currentUser = r.data as User;
  const chats = currentUser.chats as ChatWithUsers[];

  console.log(chats.map((chat) => <div>{chat.users}</div>));

  // I want to see what are the chats the user has been involved in.,

  let conversations = [];

  if (userId) {
    const response = await axios.get(`${API_URL}/chat?userId=${userId}`);
    conversations = response.data;
  }

  // people whom with you have had conversations.

  console.log(conversations);

  return (
    <main className="min-h-screen flex flex-col  border-red-500">
      {/* Dashboard page */}
      <NavBar />
      <div className="mt-16 flex grow">
        <div className="border-r flex flex-col gap-2 px-2">
          {users.map((user) => (
            <ChatUser key={user.id} user={user} />
          ))}
        </div>
        <div> Chat with the person</div>
      </div>
    </main>
  );
}
