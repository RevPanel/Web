import { LogBar } from "@/components/panel/server/service/logs";
import { auth } from "@/lib/lucia";
import prisma from "@/lib/prisma";
import * as context from "next/headers";

async function getLogs() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) return [];

  const logs = await prisma.userLogs.findMany({
    where: {
      userId: session.user.userId,
    },
  });

  return logs;
}

export default async function Page() {
  const logs = await getLogs();

  return (
    <div>
      {logs.map((log) => (
        <LogBar key={log.id} {...log} />
      ))}
    </div>
  );
}
