import Dashboard from "@/components/Dashboard";
import NavBar from "@/components/NavBar";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col px-6 md:px-10 lg:px-16 border-red-500">
      {/* Dashboard page */}
      <NavBar />
      <div className="mt-16">
        <Dashboard />
      </div>
    </main>
  );
}
