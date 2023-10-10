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
      ownerId: session.user.userId,
    },
  });

  if (!server) return false;

  try {
    const { data } = await axios.get(
      `/api/servers/${server.id}/containers/${encodeURIComponent(service)}`
    );

    return !!data.id;
  } catch (error) {
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
