"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { User } from "@/lib/types";
import axios from "axios";
import { API_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

function LikeButton({ user }: { user: User }) {
  const session = useAuth();
  const router = useRouter();

  async function likeUser() {
    try {
      const response = await axios.post(
        `${API_URL}/like`,
        {
          userId: user.id,
        },
        { withCredentials: true }
      );
      router.refresh();
      alert("Liked successfully");
    } catch (error) {
      alert("Something went wrong");
    }
  }

  return (
    <Button
      className="w-fit mt-4 bg-green-500 hover:bg-green-600"
      onClick={likeUser}
    >
      Like {user.firstName}
    </Button>
  );
}

export default LikeButton;
