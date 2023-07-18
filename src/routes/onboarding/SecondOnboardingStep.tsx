import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_URL } from "@/lib/constants";
import { useAuthentication } from "@/hooks/useAuth";
import { Textarea } from "@/components/ui/textarea";

export function SecondOnboardingStep({ onSuccess }: { onSuccess: () => void }) {
  const [bio, setBio] = useState("");
  const [error, setError] = useState<string>();

  const { user, accessToken } = useAuthentication();

  useEffect(() => {
    const existingBio = user?.bio;

    if (existingBio) {
      setBio(existingBio);
    }
  }, []);

  const handleSubmit = async () => {
    if (bio.length < 50) {
      setError("Please write at least 50 characters.");
      return;
    }

    try {
      await axios.patch(
        `${API_URL}/users/${user?.id}`,
        {
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBioChange = (updatedBio: string) => {
    if (updatedBio.length > 50) {
      setError(undefined);
    }
    setBio(updatedBio);
  };

  return (
    <main className="mx-auto border-red-500 xl:w-[50rem]">
      <h1 className="text-left text-2xl font-bold">
        Write a short description of yourself.
      </h1>
      <h2 className="mt-4 text-left text-gray-500">
        The description should be short but should best represent you as a
        person.
      </h2>
      <Textarea
        placeholder="Type your message here."
        className="mt-8"
        onChange={(e) => handleBioChange(e.target.value)}
        value={bio}
      />
      <p className={`mt-2 text-sm ${error ? "text-red-500" : "text-gray-600"}`}>
        Please write at least 50 characters
      </p>
      <Button
        className="text-md ml-auto mt-4 block bg-red-500  text-sm hover:bg-red-500"
        size={"sm"}
        onClick={handleSubmit}
      >
        Next
      </Button>
    </main>
  );
}
