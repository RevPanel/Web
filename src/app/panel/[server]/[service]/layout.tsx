import { getSession } from "@/components/auth";
import BaseLayout from "@/components/panel/layout-base";
import ServerSidebar from "@/components/panel/server/service/service-sidebar";
import prisma from "@/lib/prisma";
import axios from "axios";
import { notFound } from "next/navigation";

async function serverExists(id: string, service: string) {
  const session = await getSession();
  if (!session) return false;

  const server = await prisma.server.findUnique({
    where: {
      id,
      OR: session.user.admin
        ? undefined
        : [
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

  if (!server) return false;

  try {
    const { data } = await axios.get(
      `${process.env.APP_URL}/api/servers/${
        server.id
      }/exists?id=${encodeURIComponent(service)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ADMIN_KEY}`,
        },
      }
    );

    return data === true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;

  params: {
    server: string;
    service: string;
  };
}) {
  const exists = await serverExists(params.server, params.service);
  if (!exists) return notFound();

  return <BaseLayout sidebar={<ServerSidebar />}>{children}</BaseLayout>;
}
