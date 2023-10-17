import { getSession } from "@/components/auth";
import BaseLayout from "@/components/panel/layout-base";
import ServerSidebar from "@/components/panel/server/server-sidebar";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

async function serverExists(id: string) {
  const session = await getSession();
  if (!session) return false;

  const server = await prisma.server.findUnique({
    where: {
      id: id,
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

  return !!server;
}

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;

  params: {
    server: string;
  };
}) {
  const exists = await serverExists(params.server);
  if (!exists) return notFound();

  return <BaseLayout sidebar={<ServerSidebar />}>{children}</BaseLayout>;
}
