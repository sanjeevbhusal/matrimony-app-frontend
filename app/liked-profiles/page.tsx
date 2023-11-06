import getLikedProfiles from "@/actions/getLikedProfiles";
import NavBar from "@/components/NavBar";
import ProfileList from "@/components/ProfileList";

export default async function Page() {
  const profiles = await getLikedProfiles();

  return (
    <main className="min-h-screen flex flex-col px-6 md:px-10 lg:px-16 border-red-500">
      <NavBar />
      <div className="mt-16">
        <h3 className="font-bold text-2xl">Profiles You have liked Before</h3>
        <div className="mt-4">
          <ProfileList profiles={profiles} />
        </div>
      </div>
    </main>
  );
}
