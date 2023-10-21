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
  const {
    data: stats,
    isLoading,
    error,
  } = useFetcher(
    serverId
      ? `/api/servers/${serverId}/containers/${server.id}/stats`
      : `/api/servers/${server.id}/system/stats`
  );

  return (
    <Link
      draggable={false}
      href={
        serverId ? `/panel/${serverId}/${server.id}` : `/panel/${server.id}`
      }
      className="flex min-h-[5.25rem] flex-row items-center justify-between gap-6 overflow-x-auto rounded-xl bg-background-secondary px-6 py-4 text-white md:gap-2"
    >
      <FontAwesomeIcon icon={faServer} className="text-4xl" />
      <h1 className="w-fit text-xl font-bold">{server.name}</h1>
      <p className="min-w-fit">{server.description}</p>
      <div className="ml-4 flex items-center gap-14 md:gap-10">
        <div className="flex gap-2">
          <span>CPU: </span>
          <span>
            {stats?.offline || error
              ? "0%"
              : stats
              ? stats.cpu?.usage?.toFixed(2) + "%"
              : "Loading"}
          </span>
        </div>
        <div className="flex gap-2">
          <span>Memory: </span>
          <span>
            {stats?.offline || error
              ? "0%"
              : stats
              ? ((stats.memory?.usage / stats.memory?.total) * 100).toFixed() +
                "%"
              : "Loading"}
          </span>
        </div>
        <div className="flex gap-2">
          <span>Disk: </span>
          <span>
            {stats?.offline || error
              ? "0%"
              : stats
              ? ((stats.disk?.usage / stats.disk?.total) * 100).toFixed() + "%"
              : "Loading"}
          </span>
        </div>
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
