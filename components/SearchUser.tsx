"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchUser() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchTerm = searchParams.get("searchUser") || "";

  const handleChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("searchUser", value);
    } else {
      params.delete("searchUser");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      placeholder="Search User..."
      className="w-full"
      defaultValue={searchTerm}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
