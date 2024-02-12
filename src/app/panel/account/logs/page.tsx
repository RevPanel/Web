import { getUser } from "@/components/auth";
import { LogBar } from "@/components/panel/account/logs";
import prisma from "@/lib/prisma";

async function getLogs() {
  const session = await getUser();
  if (!session) return [];

  const logs = await prisma.userLogs.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return logs;
}

export default async function Page() {
  const logs = await getLogs();

  return (
    <div>
      {logs.reverse().map((log) => (
        <LogBar key={log.id} {...log} />
      ))}
    </div>
  );
}
