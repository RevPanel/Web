import { getUser } from "@/components/auth";
import prisma from "@/lib/prisma";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

async function getServers() {
  const user = await getUser();
  if (!user || !user.user) return [];

  return await prisma.server.findMany({
    where: {
      ownerId: user.user.id,
    },
    select: {
      id: true,
      name: true,
      url: true,
    },
  });
}

export default async function ServersHome() {
  const servers = await getServers();

  return (
    <div className="flex w-full flex-col gap-4">
      {servers.map((server) => (
        <Link
          key={server.id}
          draggable={false}
          href={server.url}
          className="flex min-h-[5.25rem] flex-row items-center justify-between gap-6 overflow-x-auto rounded-xl bg-background-secondary px-6 py-4 text-white md:gap-2"
        >
          <div className="mr-6 flex items-center gap-4">
            <FontAwesomeIcon icon={faServer} className="text-4xl" />
            <h1 className="w-fit text-xl font-bold">{server.name}</h1>
            <p className="min-w-fit">{server.url}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
