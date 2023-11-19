import getLikedProfiles from "@/actions/getLikedProfiles";
import getProfiles from "@/actions/getProfiles";
import getServerSession from "@/actions/getServerSession";
import NavBar from "@/components/NavBar";
import ProfileList from "@/components/ProfileList";

// fetch all the users from backend and render here.

export default async function Page() {
  const profiles = await getLikedProfiles();
  const session = await getServerSession();

  return (
    <main className="min-h-screen flex flex-col px-6 md:px-10 lg:px-16 border-red-500">
      <NavBar />
      <div className="mt-20">
        <h3 className="font-bold text-2xl">Liked Profiles</h3>
        <div className="mt-8">
          {profiles.length === 0 ? (
            <div className="mt-20 text-center">
              <h3 className="font-bold text-lg">There are no liked profiles</h3>
              <h3 className="text-gray-500 mt-2">
                Start Liking Profiles and they will appear here
              </h3>
            </div>
          ) : (
            <ProfileList
              profiles={profiles.filter(
                (profile) => profile.id !== session?.id
              )}
            />
          )}
        </div>
      </div>
    </main>
  );
}
