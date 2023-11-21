import getProfiles from "@/actions/getProfiles";
import getServerSession from "@/actions/getServerSession";
import NavBar from "@/components/NavBar";
import ProfileList from "@/components/ProfileList";
import Search from "@/components/Search";

// fetch all the users from backend and render here.

interface Page {
  searchParams: {
    searchTerm: string;
  };
}

export default async function Page({ searchParams }: Page) {
  console.log("Rerender all profiles page");
  const profiles = await getProfiles({
    all: true,
    searchTerm: searchParams.searchTerm,
  });
  const session = await getServerSession();

  return (
    <main className="min-h-screen flex flex-col px-6 md:px-10 lg:px-16 border-red-500">
      <NavBar />
      <div className="mt-20">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h3 className="font-bold text-2xl">All Profiles</h3>
          <Search />
        </div>
        <div className="mt-8">
          <ProfileList
            profiles={profiles.filter((profile) => profile.id !== session?.id)}
          />
        </div>
      </div>
    </main>
  );
}
