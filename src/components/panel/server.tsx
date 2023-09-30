"use client";

import { useFetcher } from "@/hooks/fetcher";
import type { Describable } from "@/types/service";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ServerContainer({
  serverId,
  ...server
}: Describable & {
  serverId?: string;
}) {
  const { data: stats, isLoading } = useFetcher(
    serverId
      ? `/api/servers/${serverId}/containers/${server.id}/stats`
      : `/api/servers/${server.id}/system/stats`
  );

  return (
    <Link
      href={
        serverId ? `/panel/${serverId}/${server.id}` : `/panel/${server.id}`
      }
      className="flex flex-row items-center justify-between gap-2 overflow-x-auto rounded-xl bg-background-secondary px-6 py-4 text-white"
    >
      <div className="flex items-center gap-4">
        <FontAwesomeIcon icon={faServer} className="text-4xl" />
        <div className="flex flex-row items-center gap-2 md:flex-col md:items-start md:gap-0">
          <h1 className="w-fit text-xl font-bold">{server.name}</h1>
          <p>{server.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-10">
        <p>
          CPU:{" "}
          {stats?.offline
            ? "0%"
            : stats
            ? stats.cpu?.usage?.toFixed(2) + "%"
            : "Loading"}
        </p>
        <p>
          Memory:{" "}
          {stats?.offline
            ? "0%"
            : stats
            ? ((stats.memory?.usage / stats.memory?.total) * 100).toFixed() +
              "%"
            : "Loading"}
        </p>
      </div>
      {!isLoading && stats && !stats.offline ? (
        <div className="flex items-center gap-2">
          <span className="bg-gradient block h-5 w-5 rounded-full"></span>
          <p>Online</p>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="block h-5 w-5 rounded-full bg-background"></span>
          <p>Offline</p>
        </div>
      )}
    </Link>
  );
}
