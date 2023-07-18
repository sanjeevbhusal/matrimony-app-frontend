import Select from "react-select";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_URL } from "@/lib/constants";
import { useAuthentication } from "@/hooks/useAuth";

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: "TRAVEL", label: "Travel and Adventure" },
  { value: "SPORTS", label: "Sports and Fitness" },
  { value: "READING", label: "Reading and Literature" },
  { value: "MUSIC", label: "Music and Concerts" },
  { value: "MOVIES", label: "Movies and TV Shows" },
  { value: "COOKING", label: "Cooking and Baking" },
  { value: "ART", label: "Art and Painting" },
  { value: "PHOTOGRAPHY", label: "Photography" },
  { value: "OUTDOOR", label: "Outdoor Activities" },
  { value: "HIKING", label: "Hiking and Camping" },
  { value: "GAMING", label: "Gaming" },
  { value: "FASHION", label: "Fashion and Style" },
  { value: "DANCING", label: "Dancing" },
  { value: "TECHNOLOGY", label: "Technology and Gadgets" },
  { value: "FOOD", label: "Food and Dining" },
  { value: "VOLUNTEER", label: "Volunteer Work and Charity" },
  { value: "PETS", label: "Pets and Animals" },
  { value: "YOGA", label: "Yoga and Meditation" },
  { value: "WRITING", label: "Writing and Blogging" },
  { value: "GARDENING", label: "Gardening and Planting" },
];

interface ClientInterest {
  label: string;
  value: string;
}

export function FirstOnboardingStep({ onSuccess }: { onSuccess: () => void }) {
  const [interests, setInterests] = useState<ClientInterest[]>([]);
  const [error, setError] = useState<string>();

  const { user, accessToken } = useAuthentication();

  useEffect(() => {
    const existingInterests = user?.interests as Interest[];

    if (existingInterests.length == 0) return;

    const interest: Option[] = options.filter((option) => {
      return existingInterests.find((interest) => interest === option.value);
    });

    console.log(interest);

    setInterests(interest);
  }, []);

  const handleSubmit = async () => {
    if (interests.length < 5) {
      setError("Please select at least 5 fields");
      return;
    }

    try {
      await axios.patch(
        `${API_URL}/users/${user?.id}`,
        {
          interests: interests.map((interest) => interest.value),
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

  const handleInterestChange = (updatedInterests: ClientInterest[]) => {
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
          options={options}
          value={interests}
          onChange={(e) => handleInterestChange(e as ClientInterest[])}
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
        >
          Next
        </Button>
      </div>
    </main>
  );
}
