"use client";

import { useAuth } from "@/lib/providers/AuthProvider";
import { redirect } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (user) {
    return redirect("/dashboard");
  }
  return children;
}
