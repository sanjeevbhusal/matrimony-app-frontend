import { User } from "@/lib/types";
import { getCapitalizedString, getUserFullName } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  profiles: User[];
}

async function ProfileList({ profiles }: Props) {
  return (
    <div>
      <div className="flex gap-6 flex-wrap">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col basis-[calc(50%-12px)] md:basis-[calc(33.3%-16px)] lg:basis-[calc(25%-18px)] xl:basis-[calc(20%-19.2px)] 2xl:basis-[calc(16.6%-20px)]"
          >
            <Link href={`/users/${profile.id}`}>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                alt="User Image"
                height={200}
                width={250}
                className="rounded-lg w-full cursor-pointer"
              />
            </Link>
            <div className="">
              <div className="mt-2 flex justify-between">
                <p className="font-semibold text-sm">
                  {getUserFullName(profile.firstName, profile.lastName)}
                </p>
                <p className="text-sm ">{profile.age} Years</p>
              </div>
              <div className="flex justify-between mt-1">
                <p className="text-sm">
                  {getCapitalizedString(profile.currentProfession || "")}
                </p>
                <p className="text-sm">
                  {getCapitalizedString(profile.currentAddress || "")}
                </p>
              </div>
              <div className="flex flex-wrap mt-2 gap-1 text-sm text-neutral-600">
                {profile.interests.map((interest, index) => (
                  <p key={interest} className="underline cursor-pointer">
                    {interest[0].toUpperCase() + interest.slice(1)}
                    {index + 1 !== profile.interests.length ? "," : ""}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileList;
