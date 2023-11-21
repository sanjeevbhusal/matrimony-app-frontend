import createChat from "@/actions/createChat";
import getChatProfiles from "@/actions/getChatProfiles";
import getProfiles from "@/actions/getProfiles";
import getServerSession from "@/actions/getServerSession";
import ChatScreen from "@/components/ChatScreen";
import ChatUser from "@/components/ChatUser";
import ChatBigScreen from "@/components/ChatbigScreen";
import NavBar from "@/components/NavBar";
import SearchUser from "@/components/SearchUser";
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
    searchUser: string;
  };
}

// get Users who have had conversations with the current user.

export default async function Page({ searchParams }: PageProps) {
  // const response = await axios.get(`${API_URL}/users`);
  // const users = response.data as User[];
  // const userId = searchParams.userId;
  let profiles = [] as User[];

  if (searchParams.searchUser) {
    profiles = await getProfiles({
      all: true,
      searchTerm: searchParams.searchUser,
    });
    console.log(profiles, searchParams.searchUser);
  }

  const user = await getServerSession();
  const chatProfiles = await getChatProfiles();

  const activeChat = chatProfiles.find(
    (chat) => chat.id === searchParams.chatId
  );
  const activeUser = activeChat?.users.find((u) => u.id !== user?.id) as User;

  // Flex child's height is more than flex parent's height. Will the flex parent's height also increase. No
  // Ideally, Flex child will shrink itself to ensure it is not greater than flex parent.

  // If flex child's height is greater than flex parent, then flex child will shrink itself to fit the flex parent. How to achieve this ? By default, flex child will shrink itself to fit the flex parent. If it is not shrinking, then it is because of some other css property.

  return (
    <main className="h-screen flex flex-col gap-14">
      <div>
        <NavBar />
      </div>
      <div className="hidden lg:flex grow overflow-hidden">
        <div className="border-r flex flex-col gap-2 px-4 py-4 w-64 overflow-auto ">
          <SearchUser />
          {chatProfiles.length > 0 ? (
            <div className="flex flex-col gap-4">
              {chatProfiles.map((chat) => (
                <ChatUser
                  key={chat.id}
                  user={chat.users.find((u) => u.id !== user?.id) as User}
                  chatId={chat.id}
                />
              ))}
            </div>
          ) : (
            <p className="font-bold mt-2">
              You have no Chats. Click on a user profile to create a chat{" "}
            </p>
          )}

          {profiles.length > 0 ? (
            <div className="border-t">
              <p className="text-sm text-neutral-500 my-4">
                These are users who you have not contacted yet
              </p>
              <div className="flex flex-col gap-4">
                {profiles.map((profile) => (
                  <ChatUser key={profile.id} user={profile} chatId={"1212"} />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {searchParams.chatId ? (
          <ChatBigScreen chatId={searchParams.chatId} />
        ) : null}
      </div>
      <div className="lg:hidden flex grow justify-center items-center px-8 font-bold">
        <p>
          Chat Feature is currently not available in Mobile Devices. Please
          switch to Desktop/Laptop to use this feature.
        </p>
      </div>
    </main>
  );
}
