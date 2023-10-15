import { Button } from "@/components/button";
import EditServer from "@/components/panel/server/edit-server";
import Toggle from "@/components/toggle";
import prisma from "@/lib/prisma";

async function getServer(server: string) {
  const s = await prisma.server.findUnique({
    where: { id: server },
    select: {
      id: true,
      name: true,
      description: true,
      members: {
        select: {
          user: {
            select: {
              name: true,
              avatarUrl: true,
              username: true,
            },
          },
        },
      },
    },
  });

  return s;
}

export default async function SettingsPage({
  params,
}: {
  params: { server: string };
}) {
  const server = await getServer(params.server);

  return (
    <div className="flex w-full flex-col gap-4 h-full">
      {server && <EditServer {...server} />}

      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div className="card w-1/2 xl:w-3/5">
          <h1 className="text-3xl font-extrabold">Version</h1>
          <p className="text-justify xl:w-2/3">
            The panel daemon automatically updates itself to the latest version.
            Sometimes, you may need to manually update the panel daemon. Click
            the button below to check for new versions and eventually update the
            panel daemon.
          </p>
          <div className="mt-auto flex gap-2">
            <Button role="primary">Check new version</Button>
            <Button role="secondary">v 1.0</Button>
          </div>
        </div>
        <div className="card w-1/2 xl:w-2/5">
          <h1 className="text-3xl font-extrabold">Notifications</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Toggle />
              <p>Service added</p>
            </div>
            <div className="flex items-center gap-4">
              <Toggle />
              <p>Service errors</p>
            </div>
            <div className="flex items-center gap-4">
              <Toggle />
              <p>Server offline</p>
            </div>
          </div>
        </div>
      </div>

      <Button role="secondary" className="w-full uppercase mt-auto">
        Remove server
      </Button>
    </div>
  );
}
