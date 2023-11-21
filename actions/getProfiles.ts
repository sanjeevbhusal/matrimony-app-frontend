import axios from "axios";
import getServerSession from "./getServerSession";
import { API_URL } from "@/lib/constants";
import { User } from "@/lib/types";
import { cookies } from "next/headers";

async function getProfiles(options?: { all?: boolean; searchTerm?: string }) {
  const user = await getServerSession();
  if (!user) {
    throw new Error("User not found");
  }

  const cookieStore = cookies();
  const userId = cookieStore.get("userId");

  if (!userId) {
    throw new Error("User not found");
  }

  const response = await axios.get(
    `${API_URL}/users?all=${options?.all}&searchTerm=${options?.searchTerm}`,
    {
      headers: {
        Cookie: `userId=${userId.value};`,
      },
    }
  );
  const users = response.data as User[];
  return users;
}

export default getProfiles;
