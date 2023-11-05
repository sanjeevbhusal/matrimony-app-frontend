import NavBar from "@/components/NavBar";
import { API_URL } from "@/lib/constants";
import { User } from "@/lib/types";
import { getCapitalizedString, getUserFullName } from "@/lib/utils";
import axios from "axios";
import { FaBirthdayCake } from "react-icons/fa";
import { BsPersonWorkspace, BsChatDots } from "react-icons/bs";
import { IoSchoolSharp } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineInterests } from "react-icons/md";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const response = await axios.get(`${API_URL}/users/${params.id}`);
  const user = response.data as User;

  return (
    <main className="min-h-screen flex flex-col px-6 md:px-10 lg:px-16 border-red-500">
      {/* Dashboard page */}
      <NavBar />
      <div className="mt-20 flex flex-col">
        <h1 className="text-2xl font-bold">
          About {getUserFullName(user.firstName, user.lastName)}
        </h1>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          alt="User Image"
          height={100}
          width={250}
          className="mt-4 rounded-lg w-72 h-72 cursor-pointer"
        />
        <div className="flex gap-2 mt-4 items-center">
          <FaBirthdayCake /> Age: {user.age}
        </div>
        <div className="flex gap-2 mt-4 items-center">
          <BsPersonWorkspace /> Profession:{" "}
          {getCapitalizedString(user.currentProfession || "")}
        </div>
        <div className="flex gap-2 mt-4 items-center">
          <IoSchoolSharp /> Education:{" "}
          {getCapitalizedString(user.highestEducation || "")}
        </div>
        <div className="flex gap-2 mt-4 items-center">
          <HiOutlineLocationMarker /> Location:{" "}
          {getCapitalizedString(user.currentAddress || "")}
        </div>
        <div className="flex gap-2 mt-4 items-center">
          <MdOutlineInterests /> Interests:{" "}
          <div className="flex gap-2 flex-wrap">
            {user.interests.map((interest) => (
              <div
                key={interest}
                className="border p-2 text-sm text-neutral-600 rounded-md"
              >
                {interest}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4 break-all">
          <div className="flex gap-2 items-center">
            <BsChatDots /> Here is a little bit about me:
          </div>

          {getCapitalizedString(user.bio || "")}
        </div>
      </div>
    </main>
  );
}
