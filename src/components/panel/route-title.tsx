"use client";

import { capitalize } from "@/utils/text";
import { usePathname } from "next/navigation";

export default function RouteTitle() {
  const pathname = usePathname();

  return (
    <div>
      <h1 className="text-2xl font-extrabold">
        {capitalize(pathname.split("/").slice(2)) || "Dashboard"}
      </h1>
    </div>
  );
}
