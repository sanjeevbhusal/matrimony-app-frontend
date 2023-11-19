import axios from "axios";
import getServerSession from "./getServerSession";
import { API_URL } from "@/lib/constants";
import { User } from "@/lib/types";
import { cookies } from "next/headers";

async function getLikedProfiles() {
  const user = getServerSession();
  if (!user) {
    throw new Error("User not found");
  }

  const cookieStore = cookies();
  const userId = cookieStore.get("userId");

  const response = await axios.get(`${API_URL}/users?liked=true`, {
    headers: {
      Cookie: `userId=${userId?.value};`,
    },
  });
  const users = response.data as User[];
  return users;
}

export default getLikedProfiles;
