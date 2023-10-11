import { Button } from "@/components/button";
import EditServer from "@/components/panel/server/edit-server";
import Toggle from "@/components/toggle";
import prisma from "@/lib/prisma";

async function getServer(server: string) {
  const s = await prisma.server.findUnique({
    where: { id: server },
    select: {
      name: true,
      description: true,
      members: {
        select: {
          user: {
            select: {
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
    <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
      {server && <EditServer {...server} />}
      <div className="flex flex-col gap-4 lg:w-1/2 xl:w-1/3">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Notifications</h1>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <Toggle />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="flex items-center gap-1">
              <Toggle />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="flex items-center gap-1">
              <Toggle />
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
        <div className="card w-full p-4">
          <h1 className="font-bold">Version</h1>
          <p className="text-justify">
            Lorem ipsum dolor sit amet. Et suscipit molestiae ut cumque commodi
            sit culpa explicabo. Est magnam incidunt eum dolorem veniam est
            impedit aliquid a error nostrum quo nemo eius sit animi asperiores
            sit iure inventore.
          </p>
          <div className="mt-6 flex gap-2">
            <Button role="primary">Check new version</Button>
            <Button role="secondary">v 1.0</Button>
          </div>
        </div>
        <Button role="secondary" className="uppercase">
          Remove server
        </Button>
      </div>
    </div>
  );
}
