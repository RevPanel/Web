"use client";

import { capitalize } from "@/utils/text";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useServerName, useServiceName } from "../servers";

export default function RouteTitle() {
  const { server, service } = useParams();
  const pathname = usePathname();
  const serverName = useServerName(server as string);
  const serviceName = useServiceName(server as string, service as string);

  if (server) {
    if (service) {
      return (
        <div>
          <h2>
            <Link className="text-white" href={`/panel/${server}`}>
              {serverName}
            </Link>{" "}
            /{" "}
            <Link className="text-white" href={`/panel/${server}/${service}`}>
              {serviceName}
            </Link>
          </h2>
          <h1 className="text-2xl font-extrabold">
            {capitalize(pathname.split("/").slice(4)) || "Dashboard"}
          </h1>
        </div>
      );
    }

    return (
      <div>
        <h2>
          <Link className="text-white" href={`/panel/${server}`}>
            {serverName}
          </Link>
        </h2>
        <h1 className="text-2xl font-extrabold">
          {capitalize(pathname.split("/").slice(3)) || "Dashboard"}
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">
        {capitalize(pathname.split("/").slice(2)) || "Dashboard"}
      </h1>
    </div>
  );
}
