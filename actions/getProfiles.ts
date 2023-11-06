import axios from "axios";
import getServerSession from "./getServerSession";
import { API_URL } from "@/lib/constants";
import { User } from "@/lib/types";

async function getProfiles() {
  const user = getServerSession();
  if (!user) {
    throw new Error("User not found");
  }
  const response = await axios.get(`${API_URL}/users`);
  const users = response.data as User[];
  return users;
}

export default getProfiles;
