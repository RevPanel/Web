"use client";

import { capitalize } from "@/utils/text";
import { useParams, usePathname } from "next/navigation";

export default function RouteTitle() {
  const { server, service } = useParams();
  const pathname = usePathname();

  if (server) {
    if (service) {
      return (
        <div>
          <h2>
            {server} / {service}
          </h2>
          <h1 className="text-2xl font-extrabold">
            {capitalize(pathname.split("/").slice(3).join("/"))}
          </h1>
        </div>
      );
    }

    return (
      <div>
        <h2>{server}</h2>
        <h1 className="text-2xl font-extrabold">
          {capitalize(pathname.split("/").slice(2).join("/"))}
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">
        {capitalize(pathname.split("/").slice(2).join("/")) || "Dashboard"}
      </h1>
    </div>
  );
}
