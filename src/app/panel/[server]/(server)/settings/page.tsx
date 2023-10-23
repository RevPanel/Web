import EditServer from "@/components/panel/server/settings/edit-server";
import RemoveButton from "@/components/panel/server/settings/remove-button";
import ServerUpdater from "@/components/panel/server/settings/updater";
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
          permissions: true,
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
    <div className="flex h-full w-full flex-col gap-4">
      {server && <EditServer {...server} />}

      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <ServerUpdater server={params.server} />

        <div className="card lg:w-1/2 xl:w-2/5">
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

      <RemoveButton server={params.server} />
    </div>
  );
}
