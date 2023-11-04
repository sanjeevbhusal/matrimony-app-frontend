import Select from "react-select";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { useAuthentication } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { UserInterest, UserInterestWithLabel } from "@/lib/types";
import { useAuth } from "@/lib/providers/AuthProvider";
import axios from "axios";
import { API_URL } from "@/lib/constants";
// import { updateUser } from "@/api/user";
// import { UserInterest, UserInterestWithLabel } from "@/types";

const availableInterests: UserInterestWithLabel[] = [
  { value: UserInterest.Travel, label: "Travel and Adventure" },
  { value: UserInterest.Sports, label: "Sports and Fitness" },
  { value: UserInterest.Reading, label: "Reading and Literature" },
  { value: UserInterest.Music, label: "Music and Concerts" },
  { value: UserInterest.Movies, label: "Movies and TV Shows" },
  { value: UserInterest.Cooking, label: "Cooking and Baking" },
  { value: UserInterest.Art, label: "Art and Painting" },
  { value: UserInterest.Photography, label: "Photography" },
  { value: UserInterest.Outdoor, label: "Outdoor Activities" },
  { value: UserInterest.Hiking, label: "Hiking and Camping" },
  { value: UserInterest.Gaming, label: "Gaming" },
  { value: UserInterest.Fashion, label: "Fashion and Style" },
  { value: UserInterest.Dancing, label: "Dancing" },
  { value: UserInterest.Technology, label: "Technology and Gadgets" },
  { value: UserInterest.Food, label: "Food and Dining" },
  { value: UserInterest.Volunteer, label: "Volunteer Work and Charity" },
  { value: UserInterest.Pets, label: "Pets and Animals" },
  { value: UserInterest.Yoga, label: "Yoga and Meditation" },
  { value: UserInterest.Writing, label: "Writing and Blogging" },
  { value: UserInterest.Gardening, label: "Gardening and Planting" },
];

export function FirstOnboardingStep({ onSuccess }: { onSuccess: () => void }) {
  const [interests, setInterests] = useState<UserInterestWithLabel[]>([]);
  const [error, setError] = useState<string>();

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  console.log(user);

  useEffect(() => {
    if (user) {
      const existingInterests = availableInterests.filter((option) => {
        return user.interests.includes(option.value);
      });
      setInterests(existingInterests);
    }
  }, [user]);

  const handleSubmit = async () => {
    if (interests.length < 5) {
      setError("Please select at least 5 fields");
      return;
    }

    if (
      !isInterestsModified(
        user?.interests as UserInterest[],
        interests.map((interest) => interest.value)
      )
    ) {
      onSuccess();
      return;
    }

    try {
      setLoading(true);
      await axios.patch(`${API_URL}/users/${user?.id}`, {
        interests: interests.map((interest) => interest.value),
      });
      onSuccess();
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInterestChange = (updatedInterests: UserInterestWithLabel[]) => {
    if (updatedInterests.length === 5) {
      setError(undefined);
    }
    setInterests(updatedInterests);
  };

  return (
    <main className="mx-auto border-red-500 xl:w-[50rem]">
      <h1 className="text-center text-2xl font-bold">
        Select the fields that interests you the most
      </h1>
      <h2 className="mt-4 text-center text-gray-500">
        We will show you profiles of people with similar intrests.
      </h2>
      <div className="mt-8 rounded-lg border border-[#CFCFCF] px-10 py-4">
        <Select
          isMulti
          name="interests"
          options={availableInterests}
          value={interests}
          onChange={(e) => handleInterestChange(e as UserInterestWithLabel[])}
        />
        <p
          className={`mt-2 text-sm ${error ? "text-red-500" : "text-gray-600"}`}
        >
          Please select at least 5 fields
        </p>
        <Button
          className="text-md ml-auto mt-4 block bg-red-500  text-sm hover:bg-red-500"
          size={"sm"}
          onClick={handleSubmit}
          disabled={loading}
        >
          Next
        </Button>
      </div>
    </main>
  );
}

const isInterestsModified = (
  originalInterests: UserInterest[],
  possiblyModifiedInterests: UserInterest[]
): boolean => {
  if (originalInterests.length != possiblyModifiedInterests.length) {
    return true;
  }

  const sortedOriginalInterests = originalInterests.slice().sort();
  const sortedPossbilyModifiedInterests = possiblyModifiedInterests
    .slice()
    .sort();

  for (let i = 0; i < sortedOriginalInterests.length; i++) {
    if (sortedOriginalInterests[i] !== sortedPossbilyModifiedInterests[i]) {
      return true;
    }
  }

  return false;
};
