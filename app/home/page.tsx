import getProfiles from "@/actions/getProfiles";
import getServerSession from "@/actions/getServerSession";
import NavBar from "@/components/NavBar";
import ProfileList from "@/components/ProfileList";

// fetch all the users from backend and render here.

export default async function Page() {
  const profiles = await getProfiles();
  const session = await getServerSession();

  return (
    <main className="min-h-screen flex flex-col px-6 md:px-10 lg:px-16 border-red-500">
      <NavBar />
      <div className="mt-20">
        <h3 className="font-bold text-2xl">
          Profiles You might be Interested In
        </h3>
        <p className="text-sm text-neutral-500 mt-2">
          Based upon your profile, Our algorithm found that you might be
          interested in these following profiles
        </p>
        <div className="mt-8">
          <ProfileList
            profiles={profiles.filter((profile) => profile.id !== session?.id)}
          />
        </div>
      </div>
    </main>
  );
}
