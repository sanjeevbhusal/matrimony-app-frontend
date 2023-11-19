"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { User } from "@/lib/types";
import axios from "axios";
import { API_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

function UnlikeButton({ user, likeId }: { user: User; likeId: string }) {
  const session = useAuth();
  const router = useRouter();

  async function unlikeUser() {
    try {
      const response = await axios.delete(`${API_URL}/like/${likeId}`, {
        withCredentials: true,
      });
      router.refresh();
      alert("UnLiked successfully");
    } catch (error) {
      alert("Something went wrong");
    }
  }

  return (
    <Button
      className="w-fit mt-4 bg-red-500 hover:bg-red-600"
      onClick={unlikeUser}
    >
      Unlike {user.firstName}
    </Button>
  );
}

export default UnlikeButton;
