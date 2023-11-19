import { API_URL } from "@/lib/constants";
import { User } from "@/lib/types";
import axios from "axios";
import { cookies } from "next/headers";

async function getServerSession(): Promise<User | null> {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId");

  console.log({ userId });

  if (!userId) {
    return null;
  }

  let user = null;

  try {
    const response = await axios.get(`${API_URL}/authentication/current-user`, {
      headers: {
        Cookie: `userId=${userId.value};`,
      },
    });

    user = response.data;
  } catch (error) {
    console.log(error);
  }

  return user;
}

export default getServerSession;
