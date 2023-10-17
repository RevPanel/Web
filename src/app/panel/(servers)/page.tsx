import ServerContainer from "@/components/panel/server";
import CreateServer from "@/components/panel/server/server-create";
import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import { removeKeys, type ServerWithoutKey } from "@/utils/responses";
import * as context from "next/headers";

async function getServerList(): Promise<ServerWithoutKey[]> {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) return [];

  const servers = await prisma.server.findMany({
    where: {
      OR: [
        {
          ownerId: session.user.userId,
        },
        {
          members: {
            some: {
              userId: session.user.userId,
            },
          },
        },
      ],
    },
  });

  return removeKeys(servers);
}

export default async function ServersHome() {
  const servers = await getServerList();

  return (
    <div className="flex w-full flex-col gap-4">
      <CreateServer />
      {servers.map((server) => (
        <ServerContainer key={server.id} {...server} />
      ))}
      {servers.length === 0 && (
        <p className="text-center text-tertiary">
          You don&apos;t have any server. Create one now!
        </p>
      )}
    </div>
  );
}
