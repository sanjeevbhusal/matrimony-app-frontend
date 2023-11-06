import getServerSession from "@/actions/getServerSession";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerSession();

  if (user) {
    return redirect("/home");
  }
  return children;
}
