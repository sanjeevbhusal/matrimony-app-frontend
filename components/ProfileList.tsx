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
      <div className="flex gap-10 flex-wrap">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col basis-full md:basis-[calc(50%-20px)] lg:basis-[calc(33.3%-26.6px)] xl:basis-[calc(25%-30px)] 2xl:basis-[calc(20%-32px)]"
          >
            <Link href={`/users/${profile.id}`}>
              <Image
                src={
                  profile.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                }
                alt="User Image"
                height={200}
                width={250}
                className="rounded-lg w-full h-[274.97px] cursor-pointer"
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
